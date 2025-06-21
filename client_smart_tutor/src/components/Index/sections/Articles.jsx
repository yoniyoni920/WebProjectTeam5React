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
    <section className="w-full bg-gradient-to-br from-[#EAEFEF] via-[#B8CFCE]/30 to-[#B8CFCE]/50 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-extrabold mb-14 text-[#333446] text-center">Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card group border border-[#7F8CAA] rounded-3xl p-12 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block shadow-xl"
            >

              <div className="text-lg text-[#7F8CAA] mb-4 font-bold">{article.category} • {article.level}</div>
              <h3 className="text-3xl font-extrabold mb-4 text-[#333446] group-hover:underline">{article.title}</h3>
              <p className="text-[#7F8CAA] mb-6 text-xl leading-relaxed">{article.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
