import React from 'react';

interface FormattedContentProps {
  content: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content }) => {
  const formatText = (text: string) => {
    // Process lists first to avoid conflicts with other patterns
    let html = text
      .replace(/(\n\d+\.\s.*)+/g, (match) => { // Numbered lists
        const items = match.trim().split('\n').map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('');
        return `<ol class="list-decimal list-inside pl-4 my-2">${items}</ol>`;
      })
      .replace(/(\n[*-]\s.*)+/g, (match) => { // Bulleted lists
        const items = match.trim().split('\n').map(item => `<li>${item.replace(/^[*-]\s/, '')}</li>`).join('');
        return `<ul class="list-disc list-inside pl-4 my-2">${items}</ul>`;
      });
      
    // Process inline formatting and images
    html = html
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<figure class="my-4"><img src="$2" alt="$1" class="rounded-lg shadow-lg mx-auto" /><figcaption class="text-center text-sm opacity-80 mt-2 italic">$1</figcaption></figure>') // Images with captions
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italics

    // Finally, handle newlines that are not part of lists
    return html.replace(/\n/g, '<br />');
  };

  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formatText(content) }} />;
};

export default FormattedContent;