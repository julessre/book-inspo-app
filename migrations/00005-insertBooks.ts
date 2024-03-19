import { Sql } from 'postgres';

const books = [
  {
    id: 1,
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    description:
      'A captivating mystery set in post-war Barcelona, revolving around a young boy who discovers a forgotten book that leads him into a dangerous labyrinth of secrets.',
    publishing_year: 2001,
    number_of_pages: 487,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81TvQiieKRL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 2,
    title: 'The Nightingale',
    author: 'Kristin Hannah',
    description:
      'A poignant tale of two sisters living in Nazi-occupied France, each embarking on their own path of survival, courage, and love during World War II.',
    publishing_year: 2015,
    number_of_pages: 440,
    cover_image_link:
      'https://images.thalia.media/07/-/2a29e64edee64c2a8199f74b649d5845/the-nightingale-epub-kristin-hannah.jpeg',
  },
  {
    id: 3,
    title: 'Educated',
    author: 'Tara Westover',
    description:
      "A remarkable memoir recounting the author's journey from a childhood in a strict and isolated household to earning a PhD from Cambridge University.",
    publishing_year: 2018,
    number_of_pages: 334,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/67fc9a982e1441a59fd6abf3aeeebc10/educated-taschenbuch-tara-westover-englisch.jpeg',
  },
  {
    id: 4,
    title: 'Circe',
    author: 'Madeline Miller',
    description:
      "A mesmerizing retelling of the story of Circe, the witch from Homer's Odyssey, exploring themes of power, transformation, and self-discovery.",
    publishing_year: 2018,
    number_of_pages: 393,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/6747883f39be4c9a96e25477837ac219/circe-gebundene-ausgabe-madeline-miller-englisch.jpeg',
  },
  {
    id: 5,
    title: 'The Goldfinch',
    author: 'Donna Tartt',
    description:
      'A sweeping novel of loss, obsession, and the beauty of art, following a young boy who steals a priceless painting after a tragic event changes his life.',
    publishing_year: 2013,
    number_of_pages: 771,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/ec03249bc7b64bf79c7bfdd08d64c89e/the-goldfinch-taschenbuch-donna-tartt-englisch.jpeg',
  },
  {
    id: 6,
    title: 'Normal People',
    author: 'Sally Rooney',
    description:
      'A nuanced exploration of the complex relationship between two young people from different backgrounds as they navigate love, friendship, and identity.',
    publishing_year: 2018,
    number_of_pages: 273,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/47f3995656e94adcb0064047ce44d04b/normal-people-taschenbuch-sally-rooney-englisch.jpeg',
  },
  {
    id: 7,
    title: 'The Hate U Give',
    author: 'Angie Thomas',
    description:
      'A powerful and timely novel following the life of Starr Carter, a young black girl who witnesses the fatal shooting of her unarmed friend by a police officer.',
    publishing_year: 2017,
    number_of_pages: 444,
    cover_image_link: 'https://m.media-amazon.com/images/I/41A2UunZ0aL.jpg',
  },
  {
    id: 8,
    title: 'All the Light We Cannot See',
    author: 'Anthony Doerr',
    description:
      'A spellbinding novel set during World War II, weaving together the lives of a blind French girl and a German boy whose paths eventually collide.',
    publishing_year: 2014,
    number_of_pages: 531,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81nWPkdM+GL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 9,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description:
      "A timeless fable about the journey of self-discovery and following one's dreams, as a young Andalusian shepherd sets off in search of a hidden treasure.",
    publishing_year: 1988,
    number_of_pages: 197,
    cover_image_link: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg',
  },
  {
    id: 10,
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    description:
      'A haunting and atmospheric novel about a young woman living in the marshes of North Carolina and accused of murder.',
    publishing_year: 2018,
    number_of_pages: 384,
    cover_image_link: 'https://m.media-amazon.com/images/I/51v0sZybMtL.jpg',
  },
  {
    id: 11,
    title: 'Conversations with Friends',
    author: 'Sally Rooney',
    description:
      "Rooney's debut novel explores the complexities of friendship and love among a group of young adults in Dublin, delving into themes of intimacy, power dynamics, and personal identity.",
    publishing_year: 2017,
    number_of_pages: 304,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71KNnVfb0lL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 12,
    title: 'My Year of Rest and Relaxation',
    author: 'Ottessa Moshfegh',
    description:
      "A darkly comedic novel following a young woman's quest for self-obliteration through a year-long experiment with prescription drugs and isolation in New York City.",
    publishing_year: 2018,
    number_of_pages: 304,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81ylfA0-9wL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 13,
    title: 'Eleanor Oliphant Is Completely Fine',
    author: 'Gail Honeyman',
    description:
      'A poignant and uplifting novel about a socially awkward woman named Eleanor Oliphant whose carefully structured life begins to unravel when she forms an unexpected friendship.',
    publishing_year: 2017,
    number_of_pages: 327,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81mveBdSLvL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 14,
    title: 'Exciting Times',
    author: 'Naoise Dolan',
    description:
      'A sharply observed debut novel following the romantic entanglements of an Irish expatriate in Hong Kong, exploring themes of love, desire, and emotional detachment.',
    publishing_year: 2020,
    number_of_pages: 256,
    cover_image_link: 'https://m.media-amazon.com/images/I/41WKtpcKh1L.jpg',
  },
  {
    id: 15,
    title: 'Fleishman Is in Trouble',
    author: 'Taffy Brodesser-Akner',
    description:
      'A satirical yet compassionate novel that explores the complexities of modern marriage, divorce, and midlife crisis through the lens of a recently separated doctor in Manhattan.',
    publishing_year: 2019,
    number_of_pages: 373,
    cover_image_link:
      'https://m.media-amazon.com/images/I/91KSWpK7I6L._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 16,
    title: 'The Interestings',
    author: 'Meg Wolitzer',
    description:
      'A sprawling novel spanning several decades in the lives of a group of friends who meet at a summer camp for artistic teenagers, exploring themes of ambition, envy, and the passage of time.',
    publishing_year: 2013,
    number_of_pages: 468,
    cover_image_link:
      'https://images.booksense.com/images/341/632/9781594632341.jpg',
  },

  {
    id: 17,
    title: 'The Perks of Being a Wallflower',
    author: 'Stephen Chbosky',
    description:
      'A coming-of-age novel written in the form of letters, following an introverted teenager named Charlie as he navigates friendship, love, and loss during his freshman year of high school.',
    publishing_year: 1999,
    number_of_pages: 213,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/41f70929710f439990e00abcf17538b8/the-perks-of-being-a-wallflower-taschenbuch-stephen-chbosky-englisch.jpeg',
  },
  {
    id: 18,
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    description:
      'A sprawling novel chronicling the lives of four college friends living in New York City, delving into themes of trauma, friendship, and the enduring power of love.',
    publishing_year: 2015,
    number_of_pages: 720,
    cover_image_link:
      'https://images.thalia.media/07/-/a26e1a07620645be82090e47b99eeb88/a-little-life-taschenbuch-hanya-yanagihara-englisch.jpeg',
  },
  {
    id: 19,
    title: 'Everything I Never Told You',
    author: 'Celeste Ng',
    description:
      'A powerful and emotionally resonant novel about a Chinese American family in the 1970s grappling with the mysterious death of their teenage daughter and the secrets that surface in its aftermath.',
    publishing_year: 2014,
    number_of_pages: 297,
    cover_image_link:
      'https://m.media-amazon.com/images/I/816SaHQ8k9L._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 20,
    title: 'We Are Okay',
    author: 'Nina LaCour',
    description:
      'A poignant novel exploring grief, loneliness, and the bonds of friendship, as a college student named Marin grapples with the aftermath of a devastating loss while spending the winter break alone in her dorm.',
    publishing_year: 2017,
    number_of_pages: 234,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71W7+efP+iL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 21,
    title: 'Dear Edward',
    author: 'Ann Napolitano',
    description:
      'A heartrending novel following a young boy named Edward who is the sole survivor of a plane crash, as he struggles to come to terms with his grief and forge a new life in the wake of tragedy.',
    publishing_year: 2020,
    number_of_pages: 352,
    cover_image_link: 'https://m.media-amazon.com/images/I/41z+vpJ+O0L.jpg',
  },
  {
    id: 22,
    title: 'The Dutch House',
    author: 'Ann Patchett',
    description:
      'A compelling family saga spanning five decades, revolving around a brother and sister who are exiled from their childhood home, The Dutch House, and their lifelong quest to reclaim it.',
    publishing_year: 2019,
    number_of_pages: 337,
    cover_image_link: 'https://m.media-amazon.com/images/I/51YP8NqVZ9L.jpg',
  },
  {
    id: 23,
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    description:
      'A thought-provoking novel exploring themes of race, identity, and family secrets, as twin sisters Stella and Desiree navigate divergent paths in life after running away from their small Southern town at the age of sixteen.',
    publishing_year: 2020,
    number_of_pages: 343,
    cover_image_link: 'https://m.media-amazon.com/images/I/41kTx5eGIDL.jpg',
  },
  {
    id: 24,
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    description:
      'A gripping and evocative novel that explores the glamorous and scandalous life of legendary Hollywood actress Evelyn Hugo, as she reveals the truth behind her seven marriages and her true love.',
    publishing_year: 2017,
    number_of_pages: 400,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71pIEVU3EeL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 25,
    title: 'Daisy Jones & The Six',
    author: 'Taylor Jenkins Reid',
    description:
      "A riveting and immersive novel set in the world of 1970s rock 'n' roll, chronicling the rise and fall of a legendary band and the turbulent relationships among its members.",
    publishing_year: 2019,
    number_of_pages: 368,
    cover_image_link:
      'https://m.media-amazon.com/images/I/811mH+xbvwL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 26,
    title: 'Maybe in Another Life',
    author: 'Taylor Jenkins Reid',
    description:
      'An enchanting novel that explores the concept of fate and the different paths our lives can take, following the parallel stories of a woman named Hannah Martin as she makes a pivotal decision.',
    publishing_year: 2015,
    number_of_pages: 342,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81PJbFyTrwL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 27,
    title: 'After I Do',
    author: 'Taylor Jenkins Reid',
    description:
      'A heartfelt novel about love, marriage, and the challenges of commitment, as a couple on the brink of divorce decides to take a year-long break to rediscover themselves and their relationship.',
    publishing_year: 2014,
    number_of_pages: 352,
    cover_image_link:
      'https://m.media-amazon.com/images/I/710vbSaDV5L._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 28,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description:
      'A thought-provoking novel about regrets, second chances, and the choices that shape our lives, as a woman discovers a mysterious library that allows her to experience the many lives she could have lived.',
    publishing_year: 2020,
    number_of_pages: 304,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71qsovx-x6L._AC_UF1000,1000_QL80_.jpg',
  },

  {
    id: 29,
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    description:
      'A captivating novel about a young woman named Addie LaRue who makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets, until she encounters a man who remembers her.',
    publishing_year: 2020,
    number_of_pages: 448,
    cover_image_link:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1584633432l/50623864.jpg',
  },
  {
    id: 30,
    title: 'Such a Fun Age',
    author: 'Kiley Reid',
    description:
      'A thought-provoking and timely novel about race, privilege, and social dynamics, as a young black woman working as a babysitter for a wealthy white family becomes entangled in a series of events that challenge her sense of self.',
    publishing_year: 2019,
    number_of_pages: 320,
    cover_image_link:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1557181911i/43923951.jpg',
  },
  {
    id: 31,
    title: 'A Promised Land',
    author: 'Barack Obama',
    description:
      "The highly anticipated memoir of Barack Obama's presidency, offering insight into his political journey, the challenges he faced, and his vision for America's future.",
    publishing_year: 2020,
    number_of_pages: 751,
    cover_image_link:
      'https://m.media-amazon.com/images/I/91+NBrXG-PL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 32,
    title: 'Untamed',
    author: 'Glennon Doyle',
    description:
      "A powerful memoir about finding courage, embracing imperfection, and reclaiming one's true self, as Glennon Doyle shares her journey of self-discovery and empowerment.",
    publishing_year: 2020,
    number_of_pages: 352,
    cover_image_link:
      'https://m.media-amazon.com/images/I/819R+8Ba7RL._AC_UF350,350_QL50_.jpg',
  },
  {
    id: 33,
    title: 'The Guest List',
    author: 'Lucy Foley',
    description:
      'A gripping psychological thriller set on a remote island off the coast of Ireland, where a glamorous wedding turns deadly when dark secrets and long-buried grudges come to light.',
    publishing_year: 2020,
    number_of_pages: 313,
    cover_image_link:
      'https://m.media-amazon.com/images/I/714UKcgGceL._AC_UF894,1000_QL80_.jpg',
  },

  {
    id: 34,
    title: 'Little Fires Everywhere',
    author: 'Celeste Ng',
    description:
      'Explores the volatile relationship between Elena Richardson, whose seemingly perfect life unravels when an enigmatic artist and her daughter move into a rental property she manages, and the intertwined fates of the two families.',
    publishing_year: 2017,
    number_of_pages: 344,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81pJ1u3UOML._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 35,
    title: 'Exit West',
    author: 'Mohsin Hamid',
    description:
      'In a divided world where magical doors appear, allowing instant travel to new locations, a young couple navigates love, loss, and displacement.',
    publishing_year: 2017,
    number_of_pages: 224,
    cover_image_link:
      'https://cdn.waterstones.com/bookjackets/large/9780/2419/9780241979068.jpg',
  },

  {
    id: 36,
    title: 'The Ministry for the Future',
    author: 'Kim Stanley Robinson',
    description:
      'A coalition of scientists, economists, and engineers come together to try and avert climate catastrophe through global cooperation.',
    publishing_year: 2020,
    number_of_pages: 550,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71rdH8xzRiL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 37,
    title: 'Lincoln in the Bardo',
    author: 'George Saunders',
    description:
      "A collection of linked stories told from the perspectives of ghosts and spirits haunting a cemetery where Abraham Lincoln's son is buried.",
    publishing_year: 2017,
    number_of_pages: 160,
    cover_image_link:
      'https://m.media-amazon.com/images/I/91SgXlqvEhL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 38,
    title: 'The Flatshare',
    author: "Beth O'Leary",
    description:
      'A heartwarming and charming novel about two Londoners who share a flat but have never met, communicating only through notes, as they navigate their complicated lives and develop a deep connection.',
    publishing_year: 2019,
    number_of_pages: 336,
    cover_image_link: 'https://m.media-amazon.com/images/I/41W79q36XtL.jpg',
  },
  {
    id: 39,
    title: 'Beach Read',
    author: 'Emily Henry',
    description:
      'A delightful and witty novel about two rival authors who find themselves living next door to each other for the summer and decide to swap genres, leading to unexpected romance and personal growth.',
    publishing_year: 2020,
    number_of_pages: 361,
    cover_image_link: 'https://m.media-amazon.com/images/I/414GPak1y8S.jpg',
  },

  {
    id: 40,
    title: 'The Hating Game',
    author: 'Sally Thorne',
    description:
      'A witty and addictive enemies-to-lovers romance between two coworkers who compete for the same promotion while engaging in a battle of wits and attraction.',
    publishing_year: 2016,
    number_of_pages: 384,
    cover_image_link:
      'https://m.media-amazon.com/images/I/817HkQzwK8L._AC_UF1000,1000_QL80_.jpg',
  },

  {
    id: 41,
    title: 'Get a Life, Chloe Brown',
    author: 'Talia Hibbert',
    description:
      'A witty and empowering romance about a chronically ill woman who creates a bucket list to take control of her life, enlisting her grumpy neighbor to help her complete the tasks and discovering unexpected love along the way.',
    publishing_year: 2019,
    number_of_pages: 373,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71St3wEtpWL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 42,
    title: 'Me Before You',
    author: 'Jojo Moyes',
    description:
      'A poignant and heart-wrenching novel about a young woman who becomes a caregiver for a wealthy quadriplegic man, leading to an unexpected friendship and a life-changing romance.',
    publishing_year: 2012,
    number_of_pages: 369,
    cover_image_link:
      'https://m.media-amazon.com/images/I/51Rp4zvA+HL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 43,
    title: 'Cleopatra and Frankenstein',
    author: 'Coco Mellors',
    description:
      'For readers of Modern Lovers and Conversations with Friends, an addictive, humorous, and poignant debut novel about the shock waves caused by one couples impulsive marriage.',
    publishing_year: 2023,
    number_of_pages: 370,
    cover_image_link: 'https://m.media-amazon.com/images/I/41kTWrxsAKL.jpg',
  },
  {
    id: 44,
    title: 'The Paper Palace',
    author: 'Miranda Cowley Heller',
    description:
      'A story of summer, secrets, love, and lies: in the course of a singular day on Cape Cod, one woman must make a life-changing decision that has been brewing for decades.',
    publishing_year: 2022,
    number_of_pages: 400,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81qXtewkNcL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 45,
    title: 'Everything I Know About Love',
    author: 'Dolly Alderton',
    description:
      'Award-winning journalist Dolly Alderton survived her twenties (just about) and in Everything I Know About Love, she gives an unflinching account of the bad dates and squalid flat-shares, the heartaches and humiliations, and most importantly, the unbreakable female friendships that helped her to hold it all together. Glittering with wit, heart and humour, this is a book to press into the hands of every woman who has ever been there or is about to find themselves taking that first step towards the rest of their lives.',
    publishing_year: 2019,
    number_of_pages: 368,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/cf6a2a2b61a540faa637e2d6b34db419/everything-i-know-about-love-taschenbuch-dolly-alderton-englisch.jpeg',
  },

  {
    id: 46,
    title: 'Three Women',
    author: 'Lisa Taddeo',
    description:
      "A groundbreaking work of narrative nonfiction that explores the desires and complexities of three real women's lives, delving into their intimate relationships, desires, and struggles with love, longing, and identity.",
    publishing_year: 2019,
    number_of_pages: 320,
    cover_image_link:
      'https://www.booktopia.com.au/covers/big/9781526611659/6090/three-women.jpg',
  },
  {
    id: 47,
    title: 'Animal',
    author: 'Lisa Taddeo',
    description:
      'A powerful and provocative debut novel that explores the darkest corners of desire and the consequences of obsession, as a woman named Joan embarks on a journey of self-discovery and liberation.',
    publishing_year: 2021,
    number_of_pages: 336,
    cover_image_link:
      'https://m.media-amazon.com/images/I/71qCWbOh7uL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 48,
    title: 'Becoming',
    author: 'Michelle Obama',
    description:
      'In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her -- from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the worlds most famous address. With unerring honesty and lively wit, she describes her triumphs and her disappointments, both public and private, telling her full story as she has lived it -- in her own words and on her own terms.',
    publishing_year: 2018,
    number_of_pages: 544,
    cover_image_link:
      'https://images.thalia.media/07/-/982aacc77fc6410dab2016392aaf8881/becoming-gebundene-ausgabe-michelle-obama-englisch.jpeg',
  },
  {
    id: 49,
    title: 'Malibu Rising',
    author: 'Taylor Jenkins Reid',
    description:
      'Four famous siblings throw an epic party to celebrate the end of the summer. But over the course of twenty-four hours, the family drama that ensues will change their lives will change forever.',
    publishing_year: 2022,
    number_of_pages: 400,
    cover_image_link:
      'https://m.media-amazon.com/images/I/81vtfglyzsL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 50,
    title: 'Invisible Women',
    author: 'Caroline Criado Perez',
    description:
      'From government policy and medical research, to technology, workplaces, and the media. Invisible Women reveals how in a world built for and by men we are systematically ignoring half of the population, often with disastrous consequences. Caroline Criado Perez brings together for the first time an impressive range of case studies, stories and new research from across the world that illustrate the hidden ways in which women are forgotten, and the profound impact this has on us all.',
    publishing_year: 2020,
    number_of_pages: 432,
    cover_image_link:
      'https://images.thalia.media/-/BF2000-2000/9ee0c986fa454735aa9d2aeb5b215005/invisible-women-taschenbuch-caroline-criado-perez-englisch.jpeg',
  },
];

export async function up(sql: Sql) {
  for (const book of books) {
    await sql`
    INSERT INTO books(title, author, description, publishing_year, number_of_pages, cover_image_link)
    VALUES
    (
      ${book.title},
      ${book.author},
      ${book.description},
      ${book.publishing_year},
      ${book.number_of_pages},
      ${book.cover_image_link}
    )
  `;
  }
}

export async function down(sql: Sql) {
  for (const book of books) {
    await sql`
      DELETE FROM books
      WHERE
        id = ${book.id}
    `;
  }
}
