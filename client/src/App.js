"""
app.py — Grammar-AI Web Server
================================
Flask backend that serves the website and handles API calls
for generating questions and checking answers.

Run: python app.py
Then open: http://localhost:5000
"""

import os
import sys
import random

os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from generate import load_pool, generate_question, check_answer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=os.path.join(BASE_DIR, 'static'))
CORS(app)

# Load pool once at startup
print("Loading sentence pool...")
POOL, BY_TOPIC = load_pool()
print(f"Pool loaded: {len(POOL)} sentences")

TOPICS = [
    "nouns", "verb_tenses", "articles", "prepositions",
    "adjectives", "adverbs", "conjunctions",
]

# Store active questions in memory (session -> question)
active_questions = {}


@app.route('/')
def index():
    return send_from_directory(os.path.join(BASE_DIR, 'static'), 'index.html')


@app.route('/api/generate', methods=['POST'])
def api_generate():
    data = request.json or {}
    topic = data.get('topic', random.choice(TOPICS))
    level = int(data.get('level', 1))

    if topic not in TOPICS:
        return jsonify({"error": f"Invalid topic: {topic}"}), 400
    if level not in (1, 2, 3):
        return jsonify({"error": f"Invalid level: {level}"}), 400

    question = generate_question(POOL, BY_TOPIC, topic, level)
    if not question:
        return jsonify({"error": "Could not generate question"}), 500

    qid = f"{random.randint(100000, 999999)}"
    active_questions[qid] = question

    if len(active_questions) > 1000:
        oldest = list(active_questions.keys())[:500]
        for k in oldest:
            del active_questions[k]

    return jsonify({
        "qid": qid,
        "sentence": question["sentence"],
        "level": question["level"],
        "topic": topic,
        "num_errors": len(question["rules"]),
    })


@app.route('/api/check', methods=['POST'])
def api_check():
    data = request.json or {}
    qid = data.get('qid', '')
    user_answer = data.get('answer', '').strip()

    if qid not in active_questions:
        return jsonify({"error": "Question expired or invalid"}), 400
    if not user_answer:
        return jsonify({"error": "No answer provided"}), 400

    question = active_questions[qid]
    result = check_answer(question, user_answer)

    return jsonify({
        "result": result["result"],
        "score": result.get("score", ""),
        "feedback": result.get("feedback", []),
        "corrected": result.get("corrected"),
        "ai_summary": result.get("ai_summary"),
        "sentence": question["sentence"],
        "answer": question["answer"],
    })


@app.route('/api/topics', methods=['GET'])
def api_topics():
    return jsonify({"topics": TOPICS})


if __name__ == '__main__':
    os.makedirs('static', exist_ok=True)
    print("\n  Grammar-AI running at http://localhost:5000\n")
    app.run(host='0.0.0.0', port=8000)


# ── SAT/SHSAT Multiple Choice endpoints ─────────────────────────────

@app.route('/api/mc/generate', methods=['POST', 'OPTIONS'])
def api_mc_generate():
    from generate_mc import build_mc_question
    data = request.json or {}
    topic = data.get('topic', random.choice(TOPICS))
    level = 1  # MC questions always L1 for SAT/SHSAT clarity

    if topic not in TOPICS:
        return jsonify({"error": f"Invalid topic: {topic}"}), 400

    question = generate_question(POOL, BY_TOPIC, topic, level)
    if not question:
        return jsonify({"error": "Could not generate question"}), 500

    mc = build_mc_question(question)
    if not mc:
        return jsonify({"error": "Could not build MC question"}), 500

    qid = f"mc_{random.randint(100000, 999999)}"
    active_questions[qid] = {**question, "mc": mc}

    return jsonify({
        "qid": qid,
        "sentence": mc["sentence"],
        "sentence_marked": mc["sentence_marked"],
        "options": mc["options"],
        "topic": topic,
        "rule_name": mc["rule"]["name"],
    })


@app.route('/api/mc/check', methods=['POST', 'OPTIONS'])
def api_mc_check():
    from generate_mc import build_mc_question
    data = request.json or {}
    qid = data.get('qid', '')
    selected_index = data.get('selected_index')

    if qid not in active_questions:
        return jsonify({"error": "Question expired or invalid"}), 400

    q = active_questions[qid]
    mc = q.get("mc")
    if not mc:
        return jsonify({"error": "Not an MC question"}), 400

    is_correct = selected_index == mc["correct_index"]
    selected_word = mc["options"][selected_index] if selected_index is not None else ""

    ai_summary = None
    if not is_correct:
        from generate import _get_ai_summary, get_diff_regions
        orig_regions = get_diff_regions(q["sentence"], q["answer"])
        rules = q["rules"]
        unfixed_rules = rules
        unfixed_regions = orig_regions
        ai_summary = _get_ai_summary(
            q["sentence"], q["answer"], selected_word,
            rules, [], list(range(len(rules))),
            unfixed_rules, unfixed_regions
        )

    return jsonify({
        "result": "correct" if is_correct else "incorrect",
        "correct_index": mc["correct_index"],
        "correct_word": mc["correct_word"],
        "explanation": mc["explanation"],
        "corrected": mc["answer"],
        "ai_summary": ai_summary,
    })
