/**
 * Formats a string key by capitalizing the first letter.
 * @param key The string key to format.
 * @returns The formatted string key.
 */
export const formatKey = (key: string): string => 
  key.charAt(0).toUpperCase() + key.slice(1)