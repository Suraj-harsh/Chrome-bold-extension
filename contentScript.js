// Function to make half of the word bold
function boldHalfOfWord(word) {
  const halfLength = Math.ceil(word.length / 2);
  const firstHalf = word.slice(0, halfLength);
  const secondHalf = word.slice(halfLength);
  return `<span style="font-weight: bold;">${firstHalf}</span>${secondHalf}`;
}

// Function to process text without affecting HTML structure
function processText(text) {
  return text.replace(/\S+/g, boldHalfOfWord);
}

// Function to recursively process text nodes
function processTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE && node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE') {
    const span = document.createElement('span');
    span.innerHTML = processText(node.textContent);
    node.parentNode.replaceChild(span, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    Array.from(node.childNodes).forEach(processTextNodes);
  }
}

// Start processing from the body
processTextNodes(document.body);