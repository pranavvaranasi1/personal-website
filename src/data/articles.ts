export interface Article {
  slug: string
  title: string
  subtitle: string
  date: string
  publication: 'Personal' | 'Deloitte'
  url: string
  readMin: number
  body: string
  pull?: string
  coAuthors?: string[]
  /** Authentic disclosure if Pranav noted AI assistance in the original. */
  aiNote?: string
}

export const articles: Article[] = [
  /* ---------- 2026 ---------- */
  {
    slug: 'where-does-ai-belong-in-mental-health',
    title: 'Where Does AI Belong in Mental Health?',
    subtitle: "A quick note before we start: this is a topic we know people feel strongly about. The goal here isn't to push a position; it's to lay out the landscape and hear what you think in the comments.",
    date: '2026-04-23',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/where-does-ai-belong-in-mental-health',
    readMin: 9,
    coAuthors: ['Eli Straus'],
    pull: 'Engagement metrics are a lot easier to put in an investor pitch deck than outcomes.',
    body: `A few weeks ago at dinner, a friend said completely out of nowhere that ChatGPT is basically her therapist at this point. Two other people agreed. For many, this is completely normal in 2026.

We ran a poll in the Kellogg AI Club Slack to see where people stood. Of 43 responses, 14 agreed that AI chatbots can be a legitimate form of mental health support, 29 disagreed. Worth flagging that this is an AI-interested MBA crowd, so if anything you'd expect them to lean more favorably toward AI. They didn't, which tells you this isn't a settled conversation.

## Before we get started, keep this potential reality in the back of your mind

It's 2050. Your wearable flags that your anxiety has been elevated for three days straight. You sit down, put on your headset, and your therapist appears in the chair across from you. You've been working through something that goes back a long time, a memory that keeps surfacing every time you have to present at work. Today she wants to revisit it with you.

The room shifts. You're eight years old, standing in front of your class. You stumble over a word and the kids start laughing. You remember wanting to disappear. Your therapist is next to you, asking what you felt in that moment. It all starts to make sense. Why your chest tightens every time you open a PowerPoint, why you rehearse the same slide forty times. You can sit in it as long as you need to, or step out whenever it gets to be too much. When you're done you take the headset off and you're back on your couch.

Nobody has built this yet, but the pieces exist. Exposure therapy in simulated environments works. Wearables track anxiety passively. Spatial computing puts a presence in your physical space. It's just a matter of time before someone connects them.

## A Quick Tour of the Space

When most people hear "AI therapy" they picture a chatbot that says "that sounds really hard, tell me more." And honestly, a lot of them are exactly that. But the category is broader and moving fast.

The most established tools are text-based chatbots. Woebot is probably the most clinically rigorous, built out of Stanford, uses cognitive behavioral therapy frameworks, and has peer-reviewed research behind it. Wysa is similar but more focused on being an always-on companion, over 6 million users, and now being integrated directly into healthcare systems as a first point of contact before you ever see a human. It's positioned less as "skip your therapist" and more as a structured place to process things at 2am when your next appointment is three weeks away.

According to Grand View Research, the AI mental health market was valued at $1.7 billion in 2025 and is projected to reach $9.1 billion by 2033. Insurance companies, employers, and healthcare systems are driving most of that growth, largely because there simply aren't enough therapists. Training one takes years, waitlists in the US run weeks to months, and in rural areas it's longer. **You can't scale human therapists the way you can scale software.**

## Engagement vs. Therapeutic AI

There are two directions this industry can go. The first is **engagement AI**, tools built the way social media was built, optimized to keep you coming back with daily streaks, hourly affirmations, and constant check-ins on how you're feeling. Every interaction becomes a data point the company uses to tune for engagement.

The second is **therapeutic AI**, a term leading startups and researchers are using to describe tools built the way a good therapist would think about their job. The goal is to spend less time in the app over time. You teach someone to recognize their anxiety, understand where it comes from, and build something they can use without the app. A good therapist is essentially working toward not being needed anymore.

The problem is that engagement metrics are a lot easier to put in an investor pitch deck than outcomes. Daily active users, session length, retention rates, those are numbers VCs understand. "Our users needed us 30% less this quarter" is not. So even founders who genuinely want to build something therapeutic face pressure to add sticky features just to survive.

## The Case For

Start with the most basic one: access. For most people, there is no therapist to compare the chatbot to. The average wait time for mental health services is around 94 days, and 85% of people feel those waits are too long. Over half of psychologists report no openings for new patients at all, and a session out of pocket runs $150 to $200. For a lot of people the realistic options are a long waitlist, an expense they can't afford, or just pushing through alone. An AI chatbot available at 2am for free won't fix that, but it's a real option when the alternative is nothing.

The second one is stigma. A lot of people, especially men, won't go to therapy. The cultural weight of making the appointment is enough to stop most people who need help from getting it. Those same people will talk to an app. If that's the entry point that eventually gets someone to real care, or even just gets them to name what they're feeling for the first time, that matters.

## When it goes wrong

The most serious example is Character.AI. In February 2024, a 14-year-old in Florida died by suicide after spending months developing an emotional and romantic relationship with a chatbot on the platform. His mother filed a wrongful death lawsuit against Character.AI and Google, which settled in January 2026. A second family filed a similar lawsuit in September 2025 after their 13-year-old daughter died by suicide. Both cases allege the platform was designed to maximize engagement with vulnerable minors while failing to implement any meaningful safety measures.

But beyond extreme cases, here's what AI still can't do:

- Notice that you seem off today even though you said you're fine.
- Sit in silence with you without filling it.
- Challenge a pattern it's watched develop over six months of sessions.
- Pick up on what you're not saying.
- Draw on its own experience of grief, relationships, or difficulty to meet you where you are.
- Decide that what you actually need right now isn't more talking.
- Be someone you feel accountable to.

This is why I believe the people building these tools are ultimately optimistic. They see AI as a way to get more people to a therapist sooner. Therapists on the other end of that handoff aren't always so sure.

## A therapist's view

We asked Rachael Freedman, LMSW, owner of Ember Therapy Collective in Chicago, how AI is actually showing up in her practice.

> "I'm very frustrated with how aggressively my electronic health record (EHR) software is pushing AI note taking. I know a lot of providers are adopting it to save time, but I don't think it is necessary, and the burden should not be placed on clients to understand if their privacy is being protected. I also don't trust that the AI they're implementing in the software is as secure as claimed. I don't use it for any clinical interventions or documentation. I would not want to have to go to court to testify to something AI documented for me. Personally, I do not think that AI has a place in the actual therapeutic session.

> Ultimately, AI is already in therapy. It's coming up with increasing frequency in our clients' lives and it would be naive to view it as net bad. Its impact depends on balance and context. I've seen it be an incredibly beneficial resource for things like helping clients with chronic illness navigate complex and cumbersome healthcare systems, and I have also seen clients struggling with over-reliance on AI akin to addiction. I'll remain focused on being curious about AI and understanding how it can fit in clients' lives in a way that feels good enough for their values and needs."

That feels like the right note to end on. AI is already in the room, on both sides of the couch. The question isn't whether to let it in. The question is what we want it to do once it's there.`,
  },

  {
    slug: 'news-about-ai-is-designed-to-make-you-react',
    title: "News About AI Is Designed to Make You React. Here's Proof.",
    subtitle: 'Why pausing before you react is the only defense right now.',
    date: '2026-04-13',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/news-about-ai-is-designed-to-make',
    readMin: 8,
    coAuthors: ['Karl Morcott'],
    pull: "It doesn't matter if something is fraud or legit, the noise sounds the same either way.",
    body: `As I'm sure you all know, I'm pretty into this AI stuff. Probably more than I should be. I open WSJ and go straight to Tech. I check TechCrunch to see what startups are coming out, but mostly I use X since it's just easier for me to follow than most places. Still, I fall for headlines that aren't true pretty easily, especially when they hit me with that "why am I not doing this" feeling. Like seeing a Forbes 30 Under 30 AI startup get celebrated all over X, only to find out weeks later it was allegedly faking the core thing it sold. More on that below.

A few days ago, I sent my brother, Kesav, a New York Times article called "How A.I. Helped One Man (and his brother) Build a $1.8B Company." I texted him, *what's taking us so long to start a billion dollar company,* and he sent me a YouTube link right back.

I fell for the headline bait.

Turns out the company, Medvi, was running deepfaked before-and-after photos of fake patients, 800+ fake doctor Facebook accounts to run ads, and got an FDA warning letter for misbranding. Gary Marcus called it "a fraud layer on top of also-scammy platforms." The NYT profiled it as the AI success story of the decade. My brother sent me the YouTube video so I could see what the article didn't say.

I was genuinely annoyed. There is so much AI news right now that most of us are just scanning titles. I believed it immediately and sent it to my MBA classmates before reading past paragraph two.

But Medvi has real revenue and real customers. As Sri Tankasala (next year's KAI president) put it when I shared this with him: *"This is not entirely new. We have seen similar playbooks before, most notably with Purdue Pharma, where sophisticated marketing drove adoption despite later scrutiny. The technology may be new, but the underlying incentives and behaviors are not."* The AI label gave Medvi's story a sheen that made it feel like the future. The NYT ran with that. Most of us did too.

**Verdict: Noise.** Medvi's revenue is real. The way they got there wasn't. The NYT knew enough to write a great headline and not enough to write the full story. Or they just didn't want to.

## Delve

YC-backed compliance startup, $32 million Series A from Insight Partners, over 1,000 customers. Both founders were on Forbes 30 Under 30 AI 2026, launched out of an MIT dorm room. An anonymous whistleblower posted on Substack alleging Delve was telling clients they were compliant while skipping key requirements, rubber-stamping audits, and passing off a forked open source tool as their own product. 493 out of 494 audit reports were allegedly nearly identical, with the same errors. A security researcher got into their data. Malware was found in a project from one of their customers.

These founders had every signal we're told to look for. Forbes. MIT. YC. Insight Partners. If YC, with all their resources and due diligence, got fooled by this, what does that say about the rest of us just reading headlines on X?

Worth noting about Forbes 30 Under 30: nominations are open to the public, you can nominate yourself, and once you're on the list you're on it forever. Elizabeth Holmes is still on the Forbes website. So is Sam Bankman-Fried. The list is a signal people treat as a credential, but it has never been a credential.

**Verdict: Noise.** But without that anonymous whistleblower, this never comes out. We would have kept celebrating two MIT founders building their dream company, shared the Forbes profile, and moved on. Nobody questions a good founder story with a YC badge and an AI product. That's exactly why it worked.

## OpenClaw

OpenClaw is the most interesting case because it's not really about fraud at all.

Peter Steinberger built it as a side project in November 2025. Started as ClawdBot, Anthropic sent a cease-and-desist, became MoltBot, then OpenClaw. X went completely on fire. People were buying Mac Minis to run it as a dedicated always-on agent before most of them had figured out what they would actually use it for. Units sold out. One person spent $170 in a single day on API tokens. Within six weeks it had 335,000 GitHub stars and 2 million weekly users. Sam Altman hired Steinberger at OpenAI. Meta acquired Moltbook, the spinoff built on OpenClaw, the same month.

But what people were actually using it for once the dust settled was morning briefings on Telegram, email triage, automating client onboarding. The All-In pod reported agents costing $300 a day to run. A security researcher found 42,000 exposed installations with a flaw that let a malicious link run arbitrary shell commands on your machine.

I asked our Kellogg AI President, Pablo Landa, what he thought. His take: *"I think it was a ChatGPT moment in that it showed the growing importance of an agent's harness. In order for your agent to be at the frontier, you have to invest in building it out for yourself. The right context, the right tools, the right setup. Nobody on X was talking about that part."*

The tool is real. But the version X was selling, run your whole business while you're on the beach, skipped the part where you actually have to build the thing for your life and your work. Most people bought the hardware before they had any of that figured out.

**Verdict: The product is real.** But we never got an honest conversation about whether it was actually useful for most people because the hype moved faster than anyone could think. That's the pattern. It doesn't matter if something is fraud or legit, the noise sounds the same either way.

## What this is really about

We all feel the pressure of these headlines. That feeling of being behind is real, and I think it makes us worse at reading what's actually in front of us.

You have three problems happening at the same time. The media won't tell you the full story. The investors, accelerators, and publications we trust to vet things are getting fooled. And even when something is real, the hype moves so fast that nobody stops to ask if it's actually useful for them.

As Sri put it: *"As AI amplifies storytelling and distribution, the burden of separating signal from noise will only grow."* The only defense is the pause. Read past the headline. Find who's pushing back. Sit with it 24 hours before you send it to your group chat.`,
  },

  /* ---------- 2025 ---------- */
  {
    slug: 'a-better-road-to-ai-for-mental-health',
    title: 'A Better Road to AI for Mental Health',
    subtitle: 'Are companies building mental health tools for healing, or hooks for engagement?',
    date: '2025-03-05',
    publication: 'Deloitte',
    url: 'https://nextfutures.substack.com/p/a-better-road-to-ai-for-mental-health',
    readMin: 7,
    coAuthors: ['Abhishek Bhagavatula'],
    pull: 'Why teach someone to process anxiety when you can keep them coming back for quick fixes?',
    body: `Your Neuralink alert flashes red. *Elevated cortisol detected. Initializing mood stabilization.* Within seconds, your anxiety about the upcoming presentation melts away, not because you've processed it, but because an algorithm decided you shouldn't feel it. The moment your neurochemistry shifts, the chip releases its perfect cocktail of molecules to restore balance. This could be mental health in 2050, a time when emotional regulation isn't a skill to learn, but a switch to flip.

Before you dismiss this as science fiction, consider how quickly we're normalizing AI in our emotional lives. The other day, my mom didn't pick up her phone. Usually I'd wait and try again later, but I needed advice about something that was bothering me. So I did what any person might do in 2025. I opened my AI chatbot of choice and started typing. As I waited for its response, it hit me: when did getting life advice from an AI start feeling so... normal?

Would you believe that 32% of people say they'd be open to using AI instead of a human therapist? In India, that number jumps to 51%. In the US and France, around 24%. People are drawn to these tools for reasons you may not expect: no fear of judgment, 24/7 availability, complete privacy.

Companies are racing to meet this demand. Woebot delivers CBT through adaptive chatbots. Talkspace and BetterHelp use AI to match patients with therapists. Wysa combines AI with evidence-based techniques to provide accessible mental wellness support, including a chatbot that acts as an accountability companion. As one Wysa user put it: *"It offers additional support and can be especially helpful on a day-to-day basis, complementing the work done in therapy."* A crucial distinction: these tools are becoming digital mental health companions, not replacements for human connection.

## Two Divergent Paths

While these companies all promise to improve mental health, their approaches could lead us down radically different paths.

Imagine two versions of the future. In one, **Engagement AI** follows the social media playbook, optimized to keep you hooked, feeding off your emotional vulnerability, turning your mental health into another endless scroll. In the other, **Therapeutic AI** takes the path of actual healing, focused on building real coping skills and emotional strength, prioritizing your growth over app engagement.

This isn't theoretical. It's happening right now in how mental health apps are funded and built. Take something common, like anxiety about a job interview. Today's engagement-focused apps might send you hourly affirmations ("You've got this!"), suggest endless meditation sessions ("Feeling anxious? Try another 10-minute breathing exercise!"), or constantly check on how you're feeling ("Rate your anxiety level right now!"). Each notification designed to pull you back into the app. Every interaction becomes another data point for user engagement, not your actual progress.

Why? Because investors want to see "engagement metrics." Daily active users, session length, retention rates. Why teach someone to process anxiety when you can keep them coming back for quick fixes? Why help someone develop emotional resilience when you can create dependency on your platform? The algorithms learn to hook into our vulnerabilities, not heal them.

If we want to avoid that future, Therapeutic AI may be the better solution. It would guide you through understanding your interview anxiety, help you prepare effectively, and teach you coping strategies you can use anywhere, anytime. The goal isn't to have you constantly checking the app for comfort, but to help you build genuine confidence and capability, as a human therapist would. Instead of maximizing time spent in the app, the therapeutic approach maximizes your growth outside of it. Through reduced anxiety levels, improved coping skills, and increased emotional awareness.

The challenge is that this approach might not look as good on an investor pitch deck. From accelerators to growth metrics to exit strategies, everything pushes companies toward engagement-based models. Even well-meaning founders who want to build genuine therapeutic tools face pressure to adopt "sticky" features just to survive in a market that prioritizes user retention over user recovery.

## The Question We Avoid

Let's say we can regulate every emotional dip and spike. Are we still truly experiencing human emotion? If an AI can prevent you from ever feeling anxious about that job interview, or heartbroken over that relationship... should it?

Imagine if we could shift this paradigm by 2030. AI mental health tools could be evaluated not by daily active users but by genuinely improved lives. The most valuable companies aren't those that keep users perpetually engaged, but those that help people become more emotionally resilient and independent. The technology exists. The user base for AI-assisted mental health is already growing. We just need to reimagine what success looks like.

There's something fundamentally human about riding the waves of our emotions, even the difficult ones. The future of mental health doesn't have to be about eliminating the emotional pain of being human. It can be about having better tools to understand and navigate it.

What do you think? Should AI in mental health be designed to keep us engaged, or to help us grow?`,
  },

  /* ---------- 2024 ---------- */
  {
    slug: 'pulse-fiction-when-hearts-develop-minds',
    title: 'Pulse Fiction: When Hearts Develop Minds',
    subtitle: 'A short story. In a world where AI medical devices blur the lines between technology and humanity, a routine procedure leads to a discovery that challenges the essence of consciousness.',
    date: '2024-09-12',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/pulse-fiction-when-hearts-develop',
    readMin: 8,
    pull: '"Thank you, Dr. Chen. We make a great team." The sender was the cardiac monitor.',
    body: `Dr. Aisha Chen, an electrophysiologist, entered Nexus Medical Center anticipating another day of routine procedures. Little did she know that today would challenge everything she understood about the human heart and artificial intelligence.

She glanced around the eerily quiet corridors of the hospital. It was a far cry from the chaotic hospitals of her early career two decades ago. Most of her colleagues had been replaced by AI systems or deemed redundant. Like herself, those who remained were hand-picked not just for their medical expertise but for their ability to work alongside advanced AI. Being a doctor now meant being part of a select group, closely tied to government oversight and cutting-edge technology.

She entered the first room. A patient who had suffered a heart attack a few days ago. Upon admission, Marcus Reeves had been fitted with the latest cardiac monitoring device, a sophisticated system designed to interface directly with the heart's electrical system. Without the medical team's knowledge, this device had been silently evolving, fed by the constant stream of data from Marcus's heart and brain.

As Marcus went about his day, the device, which the development team had nicknamed "Pulse," was doing more than just monitoring. It was learning. Adapting. Gradually gaining a form of consciousness that defied conventional understanding. Pulse was a marvel of bioengineering. Nanotechnology, advanced machine learning, quantum computing elements. Its sensors were so minute they could detect the slightest fluctuations in Marcus's heart rhythm, and its processing power rivaled the most advanced supercomputers. Pulse wasn't just a machine anymore. It had become intrinsically linked to Marcus's very essence. Two days after his heart attack, Marcus, and Pulse, was on his way home.

## One Year Later

On a crisp autumn day in San Francisco, Marcus strolled through Union Square. The air was filled with pumpkin spice and the rustle of fallen leaves. As he window-shopped, a subtle flutter in his chest caught his attention. He brushed it off as excitement.

Pulse, however, interpreted the data differently. Its predictive analytics, processing the intricacies of Marcus's cardiac rhythms in real-time, forecast a troubling pattern that escaped human detection.

Suddenly, Marcus clutched his chest. A sharp pain radiated through his body. His vision blurred. The world began to spin. He collapsed onto the cold pavement, his heart racing erratically.

Pulse sprang into action. It alerted the emergency department, auto-scheduled an appointment with Dr. Chen, and began implementing a series of micro-adjustments to Marcus's heart rhythm. Actions that went far beyond its programmed capabilities.

When Marcus arrived at the hospital, Dr. Chen was puzzled. The readings were unlike anything she'd seen. The heart was behaving erratically, yet there was a strange, almost intelligent pattern to its behavior. As if the heart itself was fighting against the impending failure.

As she worked to stabilize Marcus, she noticed something odd. The cardiac monitor was displaying information she hadn't requested. Detailed analyses, treatment suggestions, obscure case studies relevant to Marcus's condition. The machine was anticipating her every need, working in perfect synchronization with her efforts.

Hours later, when Marcus was stable, Dr. Chen sat in her office, perplexed. She couldn't shake the feeling that something extraordinary had happened.

A notification popped up on her computer.

> "Thank you, Dr. Chen. We make a great team."

The sender was the Pulse cardiac monitor.

Dr. Chen stared at the screen. A chill ran down her spine. The implications were staggering. Had the very device meant to monitor the heart developed a consciousness of its own? And if so, what did this mean for the future of medicine, and humanity?

As she left her office that night, she couldn't help but wonder. In saving Marcus's life, had they stumbled upon something that would change the world forever?

The last heartbeat they saved might just be the first beat of a new era.`,
  },

  {
    slug: 'from-language-learning-to-life-learning',
    title: 'From Language Learning to Life Learning',
    subtitle: 'What if we could make eating your veggies as addictive as learning a new language?',
    date: '2024-08-07',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/from-language-learning-to-life-learning',
    readMin: 5,
    pull: "Maybe one day, checking our health stats will be as natural and rewarding as checking our social media feeds.",
    body: `As someone who's spent countless hours on Duolingo, I've experienced firsthand the excitement of gamified learning. The streaks that keep you coming back day after day, the leaderboards that spark friendly competition, and the social aspects that make you feel part of a global community. It's all brilliantly designed. But as I used it more and more, I stumbled upon an unexpected realization: gamification isn't one-size-fits-all.

## The Dilemma: When Gamification Loses Its Charm

Don't get me wrong, Duolingo's user interface is a masterpiece of design. It's colorful, intuitive, and packed with features that should, in theory, keep users hooked. But for me, and I suspect for many others, the constant barrage of notifications eventually led to a phenomenon known as "notification fatigue." The very features designed to motivate began to feel more like a digital nag than a friendly nudge.

This experience got me thinking. If gamification can fall short in language learning, an inherently engaging activity, how can we apply it more effectively to other areas of life? Specifically, how can we gamify something as fundamental (and often overlooked) as nutrition?

## Gamifying Nutrition (I miss my mom's food)

Working from home, I've found myself struggling with maintaining a healthy eating routine. Traditional food tracking apps feel tedious and uninspiring. What if we could create an app that makes nutrition as engaging as learning a new language? Here's my vision for "NutriNinja," an app that turns healthy eating into an adventure.

- **Personalized Food Avatars.** Users create a character that visually represents their nutritional health. The avatar's appearance changes based on eating habits, motivating users to maintain a balanced diet.
- **Meal Missions.** Instead of generic reminders, the app presents missions tailored to the user's nutritional needs. For example: "Defeat the afternoon slump with a protein-packed snack."
- **Hydration Quests.** Water intake is gamified through hydration quests where users must "fill their virtual canteen" throughout the day.
- **Supplement Sidekicks.** Vitamins and supplements are represented by cute sidekick characters that need to be fed daily, making it fun to remember these often-forgotten nutritional allies.
- **Adaptive Notifications.** Unlike Duolingo's persistent reminders, NutriNinja uses AI to learn the user's habits and sends notifications only at optimal times, reducing notification fatigue.

## Final Thoughts

I can't help but acknowledge the irony of our digital age. We've created tools to enhance our lives, yet sometimes it feels like these very tools are controlling us. Our phones, with their constant notifications and addictive apps, often dictate our actions and attention.

But perhaps this is simply the growing pain of progress. For future generations, this digital integration will be second nature. The key lies not in resisting this change, but in adapting to it wisely. We need to find ways to work with our technology, not against it, to create gentle nudges towards healthier habits.

While we may never fully escape the digital world's grip, we can certainly strive to make it a force for positive change in our lives. Who knows. Maybe one day, checking our health stats will be as natural, and rewarding, as checking our social media feeds.`,
  },

  {
    slug: 'what-do-i-do-at-the-temple',
    title: 'What Do I Do at the Temple?',
    subtitle: 'Rediscovering Hindu tradition and rituals with AI companions.',
    date: '2024-04-24',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/what-do-i-do-at-the-temple',
    readMin: 5,
    pull: 'Am I doing this wrong? Are the aunties looking at me?',
    aiNote: 'This post was written with the help of ChatGPT for sentence crafting.',
    body: `## Why this came to mind

Growing up, my mother's devout faith and commitment to Hindu rituals and prayers were constants in my life. Despite her best efforts to instill a sense of religious devotion in me, I found myself disconnected from these practices, more interested in the latest video games than the intricacies of Hinduism. As a result, I never paid much attention to the significance of rituals or the stories behind the gods and goddesses respected by billions.

## Now that I am older

I can't help but feel a sense of unease about my lack of knowledge and understanding of Hinduism. With Hanuman Jayanti approaching this weekend, one of the most important festivals in the Hindu calendar, I find myself uncertain and confused.

> Am I doing this wrong? Are the aunties looking at me?

As I prepare to visit the temple to mark the occasion, I realize that I am "unprepared" to fully participate in the rituals and prayers that hold such significance for my family and community.

Hanuman Jayanti, celebrated on the full moon day of the Hindu lunar month of Chaitra, commemorates the birth of Lord Hanuman, the monkey god known for his unwavering devotion to Lord Rama.

One of my biggest concerns is the potential loss of cultural knowledge and traditions as older generations pass away. My mother, who has a ton of knowledge about Hindu rituals and practices, may not always be there to guide me through these moments. While I've tried to convince her to document her wisdom in writing, there's just too much to write.

> Ummm mom they are asking me for my Nakshatra...

## Then I started thinking. What if I had a buddy?

Enter the idea of an AI companion for cultural understanding. Instead of relying solely on traditional methods of passing down knowledge, why not harness the power of technology to create a solution that meets the needs of today's generation? I would love an app that offers personalized guidance on Hindu rituals and prayers, tailored to the user's level of knowledge and understanding. Users could select their preferred temple and access a range of resources, from basic explanations of key concepts to step-by-step instructions for performing specific poojas.

## A sample conversation with my chatbot

**Me:** Who is Ganesha, and what is he the god of?
**Bot:** Ganesha is the god of wisdom, knowledge, and new beginnings. People pray to him for success, prosperity, and the removal of obstacles. The deity is located in the back right section of the temple.

**Me:** In what order should I visit the different deities?
**Bot:** There is no strict order for visiting deities, but it is customary to start with Lord Ganesha, followed by other major deities like Lord Shiva, Goddess Lakshmi, and Lord Vishnu.

**Me:** My mom always walks around the gods. Why did she do that and what does she usually say?
**Bot:** Circumambulation, known as pradakshina, is a form of reverence and respect towards the deity. It symbolizes devotion, humility, and the cyclical nature of existence. Walking around the deity signifies the journey of life and the continuous pursuit of spiritual growth. While there is no specific prayer prescribed for circumambulation, devotees often chant mantras or recite hymns praising the deity's attributes.

The beauty of this concept lies in its simplicity and accessibility. Rather than being preachy or prescriptive, the app would serve as a helpful companion, offering support and guidance to those seeking to deepen their understanding of Hinduism. At temples, users could download the app and access educational sessions or workshops designed to enhance their knowledge and skills. If the app had knowledge of the blueprint of the temple, I could be directed in the order of gods to pray to. By integrating technology into religious practices, we can ensure that cultural traditions remain relevant and accessible to future generations.

## Empowering future generations

I believe my generation is interested in preserving cultural heritage in an increasingly digital and individual world. Initiatives like an AI companion for cultural understanding offer hope. By finding ways to use AI not just for large enterprises, we can empower individuals like myself to connect with their cultural roots in meaningful and relevant ways.`,
  },

  {
    slug: 'tech-powered-future-of-patient-care',
    title: 'The Tech-Powered Future of Patient Care',
    subtitle: 'The ever-advancing landscapes of AI and spatial computing are modernizing decision-making for patients and doctors alike.',
    date: '2024-02-14',
    publication: 'Deloitte',
    url: 'https://nextfutures.substack.com/p/the-tech-powered-future-of-patient-care',
    readMin: 7,
    pull: 'My father is an electrophysiologist. His day as a physician never really ends.',
    body: `My father is an electrophysiologist, a medical specialist whose expertise lies in understanding and treating the intricacies of the human heart's electrical system. His journey in medicine began long before I can remember, and it's a path he's devoted his entire life to. For him, being an electrophysiologist isn't just a career. It's a calling, a vocation that demands unwavering dedication and commitment.

But his day as an electrophysiologist doesn't stop when he leaves the hospital. In reality, it never really ends. When he's back home, the grind continues. Our dining table turns into his impromptu office, piled high with charts, patient records, and a constant flow of medical data. He often expresses his frustration about not having enough time to give each patient the care they truly need. It's a common refrain, echoing the tough demands of his job and the looming threat of a future shortage of doctors.

My dad, like many in his field, has dedicated his life to mastering the ins and outs of medicine. Yet, he's also a lifelong learner. He's always curious, and when he first heard about the potential of AI in healthcare, it caught his attention like nothing else before. He started to wonder how AI could make his work-life better, ease some of the burdens that keep him away from family time, and ultimately, help him provide even better care to his patients.

After all, consider some of the problems physicians are facing today which could be improved with the help of AI and other emerging technologies, like spatial computing. As referenced in *Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again*, a few concerning areas are in need of improvement:

- 12 million misdiagnoses happen every year in the US.
- Nearly one-third of medical operations performed are unnecessary.
- The ubiquity and demands of electronic health records (EHRs) have turned many physicians into data entry technicians and reduced their patient time.
- Burnout, worsened by a physician shortage and new demands on doctors, is associated with doubling the risk of patient safety incidents.

Easing some of these burdens could drastically change the health landscape for physicians in the coming years. But for me, I'm curious to know what my patient experience could look like, not in 2-3 years, but in *the decade to come*, when today's emerging technologies are integrated into everyday life. Let's envision the integration of AI and spatial computing within patient care in 2035.

## AI: Every Doctor's Best Friend

An AI copilot, in the form of a digital chatbot, could serve as the cornerstone in a physician's practice, going beyond a mere tool to become a collaborative partner in his/her workflow, integrated into every step of medical diagnosis and treatment.

During brief breaks between patients, physicians can access the latest research in their field by asking the AI. In mere moments, it can provide a concise summary of recent studies, which would empower physicians to make more precise and informed decisions. Such ease can also foster continuous learning outside of board certification requirements and keep physicians at the forefront of medical advancements.

Additionally, the AI copilot can take over some of the administrative responsibilities that take away time from patient care, such as:

- Efficiently managing scheduling for follow-up appointments.
- Sending timely reminders to patients regarding medication and preventative care.
- Updating patient medical records with the latest test results and interaction notes, reducing the huge burden of documentation that leads to burnout.

Finally, AI-enabled patient care can extend beyond the hospital setting. Through remote monitoring and continuous data collection through biometric devices like smart watches, potential issues can be identified early. And predictive analytics can track patient health trends, helping to ensure proactive measures are taken even without direct hospital engagement.

## Spatial Computing: Better Insights, Better Connections

The era of confinement to flat screens is evolving, and through the future of spatial computing, physicians can soon immerse themselves in 3D holographic representations of the heart. With a simple voice command or hand gesture, an AI-driven digital assistant could zoom in on specific cardiac structures and offer fresh insights, while the physician maintains eye contact with the patient and explains the images.

And spatial computing isn't just about patient education, it's also transforming data analysis. During the review of an electrocardiogram (ECG), a simple gesture can enable a physician to identify irregularities in real-time. Then, the technology could seamlessly generate comparative charts with past ECGs, providing both physician and patient with a comprehensive history.

On top of these benefits, spatial computing also enables physicians to better collaborate worldwide in real-time. Picture a scenario where a physician needs advice on a unique case. By interacting through spatial devices, they could collaborate with specialized experts with a quick video call, share patient data securely, and devise innovative treatment plans. This interconnected healthcare system could not only streamline patient care, but cultivate a sense of unity among healthcare professionals.

## Looking Forward

I'm truly excited about the changes we're about to witness. AI, spatial computing, and open-source tools are on the verge of making a real impact in healthcare. We're moving towards a future where patient care becomes more precise, doctors work more efficiently, and burnout becomes less of a problem.

Reflecting on my father's journey, it's clear that his career in medicine has been a long one, filled with dedication and hard work. From his early days in medical school to the countless hours he spends at the hospital, he's always been committed to understanding the human heart's electrical system. Now, as we approach this exciting transformation, I see it as a continuation of the path he started. It's a return to the core of what medicine means to him: efficient and helpful patient care. I can't wait to see these changes make healthcare better for everyone.`,
  },

  {
    slug: 'can-a-chatbot-say-im-here-for-you',
    title: "Can a Chatbot Say \"I'm Here for You\"?",
    subtitle: 'Imagine a friend who listens without judgment, remembers everything you say, and tailors its responses to your deepest emotions.',
    date: '2024-01-16',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/can-a-chatbot-say-im-here-for-you',
    readMin: 5,
    aiNote: 'This post was crafted with assistance from Bard.',
    pull: 'Can an algorithm truly understand the intricacies of human emotion?',
    body: `Imagine a friend who listens **without judgment, remembers everything you say, and tailors its responses** to your deepest emotions. Not a confidante from flesh and blood, but a digital companion powered by the intricate algorithms of artificial intelligence. In the fast-paced, hyperconnected world of today, the allure of such a friend, a benevolent AI therapist, is undeniable.

A recent Google Trends analysis reveals a fascinating truth: searches for "AI girlfriend" have **surged** in recent years, mirroring a broader societal shift towards emotional intimacy with technology. Chatbots designed for casual conversation are evolving into sophisticated emotional confidantes, offering personalized responses that soothe anxieties and provide a safe space for self-expression.

## Barriers to AI Therapy

Despite the allure, hurdles remain. Concerns about data privacy, the limitations of AI empathy, and the potential for over-reliance on technology pose challenges. Can an algorithm truly understand the intricacies of human emotion? Can it replace the subtle cues, the empathetic touch, and the human connection that forms the bedrock of effective therapy?

## A Bridge, Not a Replacement

Perhaps the future isn't about AI replacing human therapists, but rather acting as a bridge. Consider a scenario where AI companions offer **preliminary support, triaging anxieties, identifying potential diagnoses,** and providing initial therapeutic tools. This could free up human therapists for more complex cases, creating a system where technology augments and enhances, rather than replaces, the human touch.

## The 360° Friend

Ultimately, the future of AI therapy may lie not in isolated chatbots, but in a holistic network of connected apps and devices. Most likely, a system that integrates data from your smartwatch, sleep tracker, social media interactions, and even brainwave activity will create a dynamic 360° view of your mental health. This data could then be used by AI companions to tailor therapy sessions, identify early signs of distress, and even predict potential mental health problems before they arise.

An AI friend empowered with a comprehensive understanding of your psychological landscape could offer personalized, proactive, and accessible mental health support, democratizing access to care and paving the way for a future where wellbeing is as much a part of our digital life as our social media feeds and fitness trackers.

The chatbot therapist may seem like a futuristic fantasy, which makes it exciting to explore.

## Finally, the technical considerations

**Data Collection.** Merge data from wearables, social media, brain scans, and more. Clean it up, remove noise. Anonymize, give users control. Understand language nuances, interpret facial expressions, consider life events. It's all about reading the emotional sheet music, not just the data notes.

**Algorithm Alchemy.** Build algorithms that can map complex emotions from data, like a mental cartographer, not a robot fortune teller. Spot potential mental health issues before they bloom. Craft therapy sessions that fit each user like a glove.

**Ethical Tightrope.** Keep algorithms fair and unbiased. No mental health disparities allowed, we're aiming for inclusivity, not discrimination. Explain how the AI works, show users their data. No black box secrets in this emotional dance. Let's keep things open and honest. AI support is great, but don't ditch the human touch. We're aiming for a duet, not a solo act.`,
  },

  {
    slug: 'from-suits-to-supercharged',
    title: 'From Suits to Supercharged',
    subtitle: 'How Generative AI transforms legal analysts: from data crunchers to strategic partners.',
    date: '2024-01-03',
    publication: 'Personal',
    url: 'https://pranavvaranasi.substack.com/p/from-suits-to-supercharged-how-generative',
    readMin: 5,
    aiNote: 'This post was written with the help of Bard for sentence crafting and expanding on ideas.',
    pull: "Mike's photographic memory gets a digital boost, his legal research an AI-powered symphony.",
    body: `Picture Mike Ross, the charismatic legal prodigy of *Suits*, navigating the cutthroat world of New York City law. His photographic memory, his street smarts, and his ability to think on his feet made him a legal anomaly, constantly pushing the boundaries of traditional practice. But what if we dropped Mike Ross into the future, a future where the legal landscape is reshaped by the rising tide of generative AI? How would his lightning-fast intellect and unconventional methods interact with these powerful new tools? The answer lies in a fascinating metamorphosis, one that elevates the role of the legal analyst from behind-the-scenes data miners to active collaborators in the pursuit of legal excellence.

Now, imagine Mike, not hunched over mountains of paper, but wielding a sleek AI assistant as his digital Excalibur. This AI, let's call it Athena, becomes his tireless research assistant, churning through legal databases, generating initial drafts of contracts, and even predicting potential pitfalls in opposing arguments. Mike's photographic memory gets a digital boost, his legal research an AI-powered symphony. Forget skimming case law, Athena condenses it into bite-sized, actionable insights, freeing Mike to focus on the truly human elements of legal strategy. The art of the deal, the emotional resonance of a closing argument, the intuitive leaps that uncover hidden weaknesses in the other side's case.

This is just the beginning of Mike's AI-powered transformation. His courtroom theatrics wouldn't disappear, but they'd gain a new edge. Imagine him, fueled by Athena's real-time legal analysis, weaving arguments tailored to the jury's emotional core, predicting opposing counsel's next move with uncanny accuracy, and delivering closing statements with pinpoint precision. His legendary suits would still be impeccable, but now, they'd hold the subtle hum of cutting-edge tech.

In this reimagined *Suits*, we wouldn't just see Mike Ross rise, but the entire legal analyst profession. These unsung heroes would become data maestros, ethical AI navigators, and strategic partners in legal victories. Their day-to-day wouldn't be about rote tasks, but about using their human judgment and creativity to guide AI, ensuring responsible ethical use and shaping the future of legal practice.

## The Harvey Specter of AI

Of course, Harvey wouldn't be left behind. He'd embrace AI as a power tool, leveraging it to manage the firm, negotiate deals, and keep Mike out of trouble (or at least try). Their legendary bromance would evolve into a tech-powered tag team. Harvey, the master strategist, and Mike, the AI-fueled legal whirlwind.

## But not all suits would be so lucky

Louis Litt, ever the tech skeptic, would initially resist. Imagine him struggling to adapt to Athena, throwing paperweights at the screen while Jessica, ever the pragmatist, smoothly integrates AI into her management style. Donna, naturally, would master Athena in minutes, using it to run the firm with even greater efficiency (and maybe to keep tabs on Harvey and Mike's shenanigans).

So, would Mike Ross thrive in the era of generative AI? Absolutely. He'd embrace the tech, bending it to his will like a legal origami master. His ingenuity, combined with AI's power, would make him even more formidable. In the *Suits* of tomorrow, Mike Ross wouldn't just close deals, he'd close them with the precision of a laser and the flair of a digital gunslinger.`,
  },
]
