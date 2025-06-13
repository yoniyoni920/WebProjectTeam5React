import React from 'react';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "English Online Articles",
      description: "Short and simple English articles on many topics, ideal for learners.",
      level: "Easy",
      category: "Education",
      url: "https://www.english-online.at/"
    },
    {
      id: 2,
      title: "Technology in Education–OneStopEnglish",
      description: "Engaging articles with moderate vocabulary and grammar to help learners expand their skills.",
      level: "Intermediate",
      category: "Technology",
      url: "https://www.onestopenglish.com/intermediate/59532.subject"
    },
    {
      id: 3,
      title: "Advanced Reading Practice",
      description: "Challenging reading tasks and advanced vocabulary for high-level English learners.",
      level: "Advanced",
      category: "Technology",
      url: "https://learnenglish.britishcouncil.org/skills/reading/c1-reading"
    }
  ];

  return (
    <div className="content-section">
      <h2 className="section-title text-2xl font-semibold mb-6">Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300 block shadow-lg"
          >
            <div className="text-sm text-purple-400 mb-2">{article.category} • {article.level}</div>
            <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
            <p className="text-gray-300 mb-4">{article.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{article.author}</span>
              <span>{article.date}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Articles;
