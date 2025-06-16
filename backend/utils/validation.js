// Category name validation
function cleanCategoryName(name) {
  if (typeof name !== "string" || !/^[A-Za-z\s]+$/.test(name.trim())) {
    return { error: "Invalid Category. Only letters allowed." };
  }
  const cleanedName = name
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert entire string to lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter

  return { name: cleanedName };
}

export { cleanCategoryName };
