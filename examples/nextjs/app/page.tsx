
"use client";

import { useState } from "react";

const sections = [
  {
    id: 1,
    title: "Understand the Motivation",
    color: "#71369b",
    questions: [
      "What made you sign up for this webinar?",
      "What is your primary goal today? (Job change, interview prep, AI upskilling, career transition, promotion, or exploring new opportunities?)",
      "What is your motivation behind learning AI/ML or becoming AI-enabled? (For SwitchUp learners)",
      "What interested you about the Forward Deployed Engineer (FDE) role? (For FDE registrants)",
    ],
  },
  {
    id: 2,
    title: "Understand the Career Goal",
    color: "#1553a5",
    questions: [
      "What role are you currently in, and what role are you targeting next?",
      "Why have you chosen this particular career path?",
      "What does success look like for you over the next 6–12 months?",
    ],
  },
  {
    id: 3,
    title: "Understand Their Background",
    color: "#39832c",
    questions: [
      "Can you walk me through your current tech stack and day-to-day responsibilities?",
      "How hands-on are you currently with coding or technical implementation?",
      "What is your current annual compensation, and what are you targeting in your next role?",
    ],
  },
  {
    id: 4,
    title: "Assess Existing Knowledge",
    color: "#ef861e",
    questions: [
      "Have you tried learning AI or preparing for interviews on your own or through another platform? If yes, what was missing?",
      "How would you rate your current understanding of AI or your readiness for your target interviews?",
      "What skills do you think you still need to become successful in your target role?",
    ],
  },
  {
    id: 5,
    title: "Understand Learning Preferences & Timeline",
    color: "#138b96",
    questions: [
      "What type of learning works best for you? (Hands-on, project-based, mentor-led, interview-focused, etc.)",
      "How much time can you realistically dedicate each week to learning or interview preparation?",
      "What timeline are you working towards for your next job change or career transition?",
    ],
  },
  {
    id: 6,
    title: "Identify Pain Points & Challenges",
    color: "#c23e49",
    questions: [
      "What has been your biggest challenge in achieving your goal so far?",
      "Have you interviewed recently? If yes, what feedback did you receive?",
      "Apart from cost or timing, is there anything else that could prevent you from making this transition?",
    ],
  },
  {
    id: 7,
    title: "Set Expectations & Next Steps",
    color: "#142f65",
    questions: [
      "What are your expectations from today's webinar?",
      "Based on what we discussed, here's what you'll gain from the webinar...",
      "What would be the best time for us to reconnect after the webinar to discuss your questions and next steps?",
    ],
  },
];

export default function Home() {
  const [checked, setChecked] = useState<number[]>([]);
  const [open, setOpen] = useState<number[]>([1,2,3,4,5,6,7]);

  const total = sections.reduce(
    (sum, section) => sum + section.questions.length, 0
  );

  const toggle = (id: number) => {
    setChecked(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSection = (id: number) => {
    setOpen(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const copySummary = async () => {
    const result = sections.map((section, index) => {
      const lines = section.questions.map((q, i) => {
        const id = index * 100 + i;
        return `${checked.includes(id) ? "[x]" : "[ ]"} ${q}`;
      });
      return `${section.title}\n${lines.join("\n")}`;
    }).join("\n\n");

    await navigator.clipboard.writeText(result);
    alert("Checklist copied!");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-8">

        <header className="text-center mb-8">
          <p className="text-blue-700 font-bold tracking-[.25em] text-xs">
            SALES • LEARNING • CAREER
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 mt-3">
            DISCOVERY CALL GUIDE
          </h1>
          <p className="mt-3 text-sm md:text-base font-bold">
            <span className="text-purple-700">ASK.</span>{" "}
            <span className="text-blue-700">LISTEN.</span>{" "}
            <span className="text-green-700">UNDERSTAND.</span>{" "}
            <span className="text-orange-600">PERSONALIZE.</span>{" "}
            <span className="text-blue-950">RECOMMEND.</span>
          </p>
          <div className="mt-6 bg-blue-950 text-white rounded-xl p-4 text-sm">
            Ask one question at a time. Listen actively. Build rapport.
            Dig deep. Connect their goals to the right solution.
          </div>
        </header>

        <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="font-bold text-lg">Call Progress</h2>
              <p className="text-sm text-slate-500">
                Tick each question as you discuss it.
              </p>
            </div>
            <span className="text-blue-700 font-black text-xl">
              {checked.length}/{total}
            </span>
          </div>

          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${checked.length / total * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {Math.round(checked.length / total * 100)}% completed
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <section
              key={section.id}
              className="bg-white rounded-xl border overflow-hidden shadow-sm"
              style={{ borderColor: section.color }}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center gap-3 text-left"
                style={{ borderBottom: `1px solid ${section.color}40` }}
              >
                <span
                  className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold"
                  style={{ backgroundColor: section.color }}
                >
                  {section.id}
                </span>
                <span className="font-bold flex-1 text-sm"
                  style={{ color: section.color }}>
                  {section.title}
                </span>
                <span className="text-xs text-slate-500">
                  {section.questions.filter((_, i) =>
                    checked.includes(index * 100 + i)
                  ).length}/{section.questions.length}
                </span>
                <span>{open.includes(section.id) ? "−" : "+"}</span>
              </button>

              {open.includes(section.id) && (
                <div className="p-4 space-y-4">
                  {section.questions.map((question, i) => {
                    const id = index * 100 + i;
                    const done = checked.includes(id);

                    return (
                      <label
                        key={id}
                        className="flex gap-3 items-start cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggle(id)}
                          className="mt-1 w-5 h-5 accent-blue-700 cursor-pointer shrink-0"
                        />
                        <span className={`text-sm leading-relaxed ${
                          done ? "line-through text-slate-400" : "text-slate-800"
                        }`}>
                          <strong style={{ color: section.color }}>
                            {index === 6 ? 20 + i : 
                              sections.slice(0,index).reduce(
                                (s,x) => s + x.questions.length, 0
                              ) + i + 1}.
                          </strong>{" "}
                          {question}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>

        <section className="mt-6 bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-bold text-lg mb-3">
            Discovery Call Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copySummary}
              className="bg-blue-950 text-white px-5 py-3 rounded-lg text-sm font-bold"
            >
              Copy Checklist
            </button>
            <button
              onClick={() => setChecked(
                Array.from({length: total}, (_, i) => 
                  sections.slice(0).reduce((a,s,j) =>
                    a.concat(s.questions.map((_,k) => 
                      sections.slice(0,j).reduce(
                        (n,x) => n + x.questions.length, 0
                      ) + k
                    )), [] as number[]
                  )
                )
              }
              className="bg-green-700 text-white px-5 py-3 rounded-lg text-sm font-bold"
            >
              Select All
            </button>
            <button
              onClick={() => setChecked([])}
              className="border border-red-300 text-red-600 px-5 py-3 rounded-lg text-sm font-bold"
            >
              Reset All
            </button>
          </div>
        </section>

        <footer className="mt-8 bg-blue-950 text-white rounded-xl p-5 text-center">
          <h2 className="font-black tracking-wider">
            OUR GOAL
          </h2>
          <p className="text-sm mt-2">
            Uncover the real motivation, identify the right learning path,
            and help every learner achieve their career goals.
          </p>
        </footer>
      </div>
    </main>
  );
}
