import React from "react";
import { Box, Heading, Text, Button, SimpleGrid, VStack, Flex, Grid, GridItem, Progress, Badge } from '@chakra-ui/react';

<Box style={{ 
      border: '2px solid black',    // Black border around entire lesson for visual separation
      padding: '20px',              // Internal spacing for readability
      marginBottom: '20px',         // Space below lesson section
      textAlign: 'Center'            
    }}>
      {/* ===== LESSON TITLE AND INTRODUCTION ===== */}
      <h1>Verb Forms and Usage</h1>
      <Heading as="h2" size="lg">1. What Is a Verb?</Heading>
      
      {/* Introduction paragraph explaining */}
     <Text>• Verbs are words that describe an action, occurence or state of being </Text>
     <Text>• Action verbs describe an action (ex. run, jump, walk, sit) while linking verbs don't describe actions
      but links the subject to information about the subject (is, become, seems, looks).</Text>        
     <Text>• All sentences must have verbs. "I washed the dishes"</Text>
     <Text>• "I walked the dog"</Text>
     <Text>• "She ran to school today"</Text>


    <Heading as="h2" size="lg">2. Verb Tenses</Heading>
     
     <Text>Verbs can exist in the past, present and future tenses</Text>
     <Text>"She walked (past)", "she walks (present)", "she will walk (future)"</Text>
     <Text>"Progressive tense" refers to an action that was, is, or will be in progress at a certain point. Progressive tense verbs come in the form of 
      the combination of a word like "be/am/will/was" and a verb ending in "ing"</Text>
      <Text>Example: "I'll be studying for the test tomorrow"</Text>
      <Text>"Perfect tense" comes in the form of past, present, and future tenses.</Text>      
      <Text>Past perfect tense refers to an action that had begun and ended in the past. This can be done with "had" and the past participle form of a verb </Text>
      <Text>Example: I have written many poems before</Text>  
      <Text>Present perfect tense refers to an action that had begun in the past and continues in the present. This can be done with "has" or "half" and the past participle form of a verb</Text>
      <Text>Example: I have cleaned my room many times this year</Text>
      <Text>Future perfect tense refers to actions that will happen before another action. This can be done with "will" and the past participle form of a verb</Text>
      <Text>Example: I will have played professionally for 15 years by the end of the month.</Text>
      <Text>Tenses also need to be consistent</Text>
      <Text>The tense of verbs in a sentence cannot change later in the sentence when there isn't a change in time for the action</Text>
      <Text>Example of incorrect tense consistency:"Ben entered(past tense) the waiting room and walks(present tense) to the chairs"</Text>
      <Text>Example of correct tense consistency:"Ben entered(past tense) the waiting room and walked(past tense) to the chairs"</Text>


    <Heading as="h2" size="lg">3. Voice of Verbs</Heading>
     
     <Text>Active voice verbs describe when the subject does the action of the verb.</Text>
     <Text>Example: Andy drove Jenny across town</Text>
     <Text>• Passive voice verbs describe when the subject receives the action</Text>      
     <Text>Example: Jenny was driven across town by Andy</Text>  
     <Text>Active voice verbs can be used whenever possible to be clear and direct. Passive voice verbs can be used when the 
      one performing the action is unknown or irrelevant or to emphasize an action or the one receiving an action.
     </Text>

     <Heading as="h2" size="lg">4. Auxiliary (Helping) Verbs</Heading>
     
     <Text>Auxiliary verbs are verbs that are supportive to the main verb.</Text>
     <Text>Examples of auxliiary verbs include: "be", "have", and "do"</Text>
     <Text>Auxiliary verbs help the main verb show tense. In addition to that there are modal verbs. Modal verbs are verbs like "can", "should", and "must" 
      that describe the conditions of permission, possiblity, ability, and necessity</Text>        
     

     <Heading as="h2" size="lg">5. Verb Forms (Non-Finite Verbs)</Heading>
     
     
     <Text><b>Infinitives</b></Text>       
     <Text>Infinitives are special verbs that can be used as adjectives, nouns, or adverbs.</Text> 
     <Text>Examples: "I want to run", "He has to think", "She wants to create"</Text>
    

     <Text><b>Gerunds</b></Text>  
     <Text>Gerunds like infinitives are verbs that can take the place of a noun in a sentence except unlike infinitives,
       they always take the place of a noun and they can follow a preposition. They also end in -ing</Text>      
     <Text>Examples:"We continued running" "We will begin thinking" "This is part of creating" </Text>
     

     <Text><b>Participles</b></Text>        
     <Text>Present participles are used in continuous tenses or like an adjective to describe an actions that are currently occuring</Text>
     <Text>Examples: "walking", "talking", "going", "running", and "making" </Text>
     <Text>Past participles are used in perfect tenses or as an adjective describing an action that is has been completed</Text>
     <Text>Examples: "walked", "talked", "gone", "ran", and "made"</Text>

     <Heading as="h2" size="lg">6. Participial Phrases</Heading>
     <Text>Participial phrases are a type of modifier that uses the participle form of a verb to describe a noun.</Text>
     <Text>Example: "Born in a zoo, the lion knows nothing about living in the wild." The participial phrase being "born in a zoo"</Text>
     <Text>Participial phrases describe nouns by describing what they have done or what they are currently doing</Text>
     <Text>A common mistake when trying to use participial phrases are to use a dangling modifier in its place.</Text>
     <Text>Dangling modifiers are words that modify a word that isn't clearly stated in a sentence.</Text>
     <Text>Example: "With all his work done, the couch was rested on." This is a dangling modifier that can be corrected into a participial phrase by saying
      "with all of his work done, Steven rested on the couch."
     </Text>


      </Box>
