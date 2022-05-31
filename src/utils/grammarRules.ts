export const indefiniteArticle = (nextWord: string): string => {
	const startsWithVowel = /^aeiou/;

	return startsWithVowel.test(nextWord) ? 'an' : 'a'
}
