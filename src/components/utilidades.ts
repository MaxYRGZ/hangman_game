
export const wordCategories: Record<string, string[]> = {
    fruits: ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
    animals: ['cat', 'dog', 'elephant', 'giraffe', 'horse', 'lion', 'monkey', 'tiger', 'zebra'],
    countries: ['argentina', 'brazil', 'canada', 'denmark', 'egypt', 'france', 'germany', 'india', 'japan', 'kenya']
};

export const getRandomCategory = (): string => {
    const categories = Object.keys(wordCategories);
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
};

export const getRandomWord = (category: string): string => {
    const words = wordCategories[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};
