import create from 'zustand';

export const usePromptsStore = create((set) => ({
	prompts: [],
	getPrompts: (data) => set({ prompts: data }),
	addPrompt: (newPrompt) =>
		set((state) => ({ prompts: [newPrompt, ...state.prompts] })),
}));
