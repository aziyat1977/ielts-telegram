// IELTS Speaking Questions Database with Translations
const topicMeta = {
    work: { name: 'Work', icon: '💼', campaign: 'beginner' },
    study: { name: 'Study', icon: '📚', campaign: 'beginner' },
    hometown: { name: 'Hometown', icon: '🏠', campaign: 'beginner' },
    home: { name: 'Home', icon: '🏡', campaign: 'beginner' },
    daily_routine: { name: 'Daily Routine', icon: '⏰', campaign: 'beginner' },
    hobbies: { name: 'Hobbies', icon: '🎨', campaign: 'intermediate' },
    music: { name: 'Music', icon: '🎵', campaign: 'intermediate' },
    food: { name: 'Food', icon: '🍕', campaign: 'intermediate' },
    reading: { name: 'Reading', icon: '📖', campaign: 'intermediate' },
    sport: { name: 'Sport', icon: '⚽', campaign: 'intermediate' },
    shopping: { name: 'Shopping', icon: '🛍️', campaign: 'intermediate' },
    tv: { name: 'TV & Media', icon: '📺', campaign: 'intermediate' },
    leisure_time: { name: 'Leisure Time', icon: '🎯', campaign: 'intermediate' },
    family_friends: { name: 'Family & Friends', icon: '👨‍👩‍👧', campaign: 'intermediate' },
    technology: { name: 'Technology', icon: '💻', campaign: 'advanced' },
    internet: { name: 'Internet', icon: '🌐', campaign: 'advanced' },
    weather: { name: 'Weather', icon: '🌤️', campaign: 'advanced' },
    transport: { name: 'Transport', icon: '🚗', campaign: 'advanced' },
    art: { name: 'Art', icon: '🎨', campaign: 'advanced' },
    birthdays: { name: 'Birthdays', icon: '🎂', campaign: 'intermediate' },
    childhood: { name: 'Childhood', icon: '🧸', campaign: 'intermediate' },
    clothes: { name: 'Clothes', icon: '👕', campaign: 'intermediate' },
    flowers: { name: 'Flowers', icon: '🌸', campaign: 'advanced' },
    happiness: { name: 'Happiness', icon: '😊', campaign: 'advanced' },
    neighbours: { name: 'Neighbours', icon: '🏘️', campaign: 'intermediate' },
    pets: { name: 'Pets', icon: '🐕', campaign: 'intermediate' },
    patience: { name: 'Patience', icon: '⏳', campaign: 'advanced' },
    dreams: { name: 'Dreams', icon: '💭', campaign: 'advanced' }
};

const questions = {
    work: [
        { q: "What is your job?", ru: "Какая у вас работа?", uz: "Sizning ishingiz nima?", hint: "Describe your current occupation and role." },
        { q: "Where do you work?", ru: "Где вы работаете?", uz: "Qayerda ishlaysiz?", hint: "Mention the company or type of workplace." },
        { q: "Why did you choose that job?", ru: "Почему вы выбрали эту работу?", uz: "Nima uchun bu ishni tanladingiz?", hint: "Explain what attracted you to this career." },
        { q: "Is it a popular job in your country?", ru: "Это популярная работа в вашей стране?", uz: "Bu ishingiz mamlakatingizda mashhurmı?", hint: "Discuss how common this profession is." },
        { q: "Do you like your job?", ru: "Вам нравится ваша работа?", uz: "Sizga ishingiz yoqadimi?", hint: "Share your feelings about your work." },
        { q: "Do you get on well with your colleagues?", ru: "Вы хорошо ладите с коллегами?", uz: "Hamkasblaringiz bilan yaxshi munosabatdamisiz?", hint: "Talk about your workplace relationships." },
        { q: "What responsibilities do you have at work?", ru: "Какие у вас обязанности на работе?", uz: "Ishdagi vazifalaringiz qanday?", hint: "List your main duties and tasks." },
        { q: "Do you plan to continue with your job in the future?", ru: "Планируете ли вы продолжать эту работу в будущем?", uz: "Kelajakda shu ishda davom etmoqchimisiz?", hint: "Discuss your career plans." }
    ],
    study: [
        { q: "What do you study?", ru: "Что вы изучаете?", uz: "Nima o'qiysiz?", hint: "Name your subject or field of study." },
        { q: "Where do you study?", ru: "Где вы учитесь?", uz: "Qayerda o'qiysiz?", hint: "Mention your school, college, or university." },
        { q: "Why did you choose that subject?", ru: "Почему вы выбрали этот предмет?", uz: "Nima uchun bu fanni tanladingiz?", hint: "Explain your motivation for this field." },
        { q: "Is it a popular subject in your country?", ru: "Это популярный предмет в вашей стране?", uz: "Bu fan mamlakatingizda mashhurmı?", hint: "Discuss how common this field is." },
        { q: "Do you like your subject?", ru: "Вам нравится ваш предмет?", uz: "Sizga faningiz yoqadimi?", hint: "Share your feelings about what you study." },
        { q: "What are the main aspects of your subject?", ru: "Каковы основные аспекты вашего предмета?", uz: "Faningizning asosiy jihatlari qanday?", hint: "Describe key areas you focus on." },
        { q: "Do you plan to get a job in the same field?", ru: "Планируете ли вы работать в той же области?", uz: "Shu sohada ishlashni rejalashtirmoqchimisiz?", hint: "Talk about your career plans." }
    ],
    hometown: [
        { q: "Where is your hometown?", ru: "Где находится ваш родной город?", uz: "Tug'ilgan shahringiz qayerda?", hint: "Name the city/town and location." },
        { q: "Do you like your hometown?", ru: "Вам нравится ваш родной город?", uz: "Sizga shahringiz yoqadimi?", hint: "Share your feelings about it." },
        { q: "Do you often visit your hometown?", ru: "Вы часто посещаете свой родной город?", uz: "Shahringizga tez-tez borasizmi?", hint: "Explain how frequently you go back." },
        { q: "What is your hometown like?", ru: "Какой ваш родной город?", uz: "Shahringiz qanday?", hint: "Describe the atmosphere and character." },
        { q: "What is the oldest place in your hometown?", ru: "Какое самое старое место в вашем родном городе?", uz: "Shahringizdagi eng qadimgi joy qaysi?", hint: "Mention historical sites or buildings." },
        { q: "Has your hometown changed much since you were a child?", ru: "Ваш родной город сильно изменился с детства?", uz: "Shahringiz bolaligingizdan boshlab ko'p o'zgardimi?", hint: "Describe any major developments." },
        { q: "Is there good public transportation in your hometown?", ru: "Есть ли в вашем городе хороший общественный транспорт?", uz: "Shahringizda yaxshi jamoat transporti bormı?", hint: "Talk about transit options." },
        { q: "Do you think your hometown is a good place to bring up children?", ru: "Хорошее ли ваш город место для воспитания детей?", uz: "Shahringiz bolalar tarbiyasi uchun yaxshi joymı?", hint: "Discuss family-friendly aspects." }
    ],
    home: [
        { q: "Do you live in a house or a flat?", ru: "Вы живете в доме или квартире?", uz: "Uyda yoki kvartirada yashayszmi?", hint: "Describe your type of accommodation." },
        { q: "Who do you live with?", ru: "С кем вы живете?", uz: "Kim bilan yashaysiz?", hint: "Mention family, roommates, or if you live alone." },
        { q: "What is your favourite room?", ru: "Какая ваша любимая комната?", uz: "Sevimli xonangiz qaysi?", hint: "Name a room and explain why you like it." },
        { q: "How are the walls decorated?", ru: "Как украшены стены?", uz: "Devorlar qanday bezatilgan?", hint: "Describe colors, pictures, or decorations." },
        { q: "What would you change about your home?", ru: "Что бы вы изменили в своем доме?", uz: "Uyingizda nimani o'zgartirardingiz?", hint: "Suggest improvements you'd like." },
        { q: "Do you plan to live there in the future?", ru: "Планируете ли вы жить там в будущем?", uz: "Kelajakda u yerda yashashni rejalashtirmoqchimisiz?", hint: "Discuss your living plans." },
        { q: "What is your neighbourhood like?", ru: "Какой ваш район?", uz: "Mahallangiz qanday?", hint: "Describe the surrounding area." },
        { q: "Do most people live in houses in your country?", ru: "Большинство людей в вашей стране живут в домах?", uz: "Mamlakatingizda ko'pchilik odam uylarda yashaydimi?", hint: "Compare housing types in your country." }
    ],
    hobbies: [
        { q: "Do you have a hobby?", ru: "У вас есть хобби?", uz: "Sevimli mashg'ulotingiz bormı?", hint: "Name your main leisure activity." },
        { q: "What equipment do you need for it?", ru: "Какое оборудование вам нужно для этого?", uz: "Buning uchun qanday asboblar kerak?", hint: "List necessary tools or items." },
        { q: "Do you think hobbies should be shared with other people?", ru: "Вы думаете, хобби должны быть общими?", uz: "Sevimli mashg'ulotni boshqalar bilan bo'lishish kerakmi?", hint: "Give your opinion on social hobbies." },
        { q: "Did you have a hobby as a child?", ru: "У вас было хобби в детстве?", uz: "Bolaligingizda sevimli mashg'ulotingiz bordimi?", hint: "Talk about childhood interests." },
        { q: "What hobbies are popular in your country?", ru: "Какие хобби популярны в вашей стране?", uz: "Mamlakatingizda qanday sevimli mashg'ulotlar mashhur?", hint: "Mention common leisure activities." },
        { q: "Why do you think people have hobbies?", ru: "Почему, по-вашему, у людей есть хобби?", uz: "Fikringizcha, nega odamlarning sevimli mashg'uloti bor?", hint: "Explain the purpose of hobbies." }
    ],
    music: [
        { q: "Do you like music?", ru: "Вам нравится музыка?", uz: "Musiqa yoqtiraszmi?", hint: "Share your interest in music." },
        { q: "What's your favourite type of music?", ru: "Какой ваш любимый жанр музыки?", uz: "Sevimli musiqa janringiz qaysi?", hint: "Name a genre and explain why." },
        { q: "Can you sing?", ru: "Вы умеете петь?", uz: "Qo'shiq ayta olasizmi?", hint: "Talk about your singing ability." },
        { q: "Did you learn music at school?", ru: "Вы изучали музыку в школе?", uz: "Maktabda musiqa o'qidingizmi?", hint: "Describe any musical education." },
        { q: "If you could learn a musical instrument, what would it be?", ru: "Если бы вы могли научиться играть на музыкальном инструменте, на каком?", uz: "Qaysi musiqa asbobini o'rganmoqchi bo'lardingiz?", hint: "Choose an instrument and give reasons." },
        { q: "Do you think music is important?", ru: "Вы думаете, музыка важна?", uz: "Fikringizcha, musiqa muhimmı?", hint: "Discuss the value of music in life." }
    ],
    food: [
        { q: "What's your favourite food?", ru: "Какая ваша любимая еда?", uz: "Sevimli taomingiz nima?", hint: "Name a dish and explain why you like it." },
        { q: "Have you always liked the same food?", ru: "Вы всегда любили одну и ту же еду?", uz: "Har doim bir xil taomni yoqtirgansizmi?", hint: "Discuss changes in your tastes." },
        { q: "Is there any food you dislike?", ru: "Есть ли еда, которую вы не любите?", uz: "Yoqtirmaydigan taomingiz bormı?", hint: "Mention foods you don't enjoy." },
        { q: "What is a common meal in your country?", ru: "Какая обычная еда в вашей стране?", uz: "Mamlakatingizda qanday taom keng tarqalgan?", hint: "Describe a typical traditional dish." },
        { q: "Do you have a healthy diet?", ru: "У вас здоровое питание?", uz: "Sog'lom ovqatlanasizmi?", hint: "Talk about your eating habits." },
        { q: "What do you think of fast food?", ru: "Что вы думаете о фаст-фуде?", uz: "Fast-food haqida qanday fikrdasiz?", hint: "Give your opinion on fast food." }
    ],
    reading: [
        { q: "Do you often read?", ru: "Вы часто читаете?", uz: "Tez-tez kitob o'qiyszmi?", hint: "Describe your reading frequency." },
        { q: "What is your favourite kind of book to read?", ru: "Какой ваш любимый жанр книг?", uz: "Sevimli kitob janringiz qaysi?", hint: "Name a genre you prefer." },
        { q: "Do you often read newspapers?", ru: "Вы часто читаете газеты?", uz: "Tez-tez gazeta o'qiyszmi?", hint: "Talk about your news reading habits." },
        { q: "Do you have any e-books?", ru: "У вас есть электронные книги?", uz: "Elektron kitoblaringiz bormı?", hint: "Discuss digital vs physical books." },
        { q: "What books did you read as a child?", ru: "Какие книги вы читали в детстве?", uz: "Bolaligingizda qanday kitoblar o'qidingiz?", hint: "Mention childhood favorites." },
        { q: "Do you think it is important to encourage children to read?", ru: "Вы думаете, важно поощрять детей читать?", uz: "Bolalarni kitob o'qishga undash kerakmi?", hint: "Explain the benefits of reading." }
    ],
    sport: [
        { q: "Do you like sport?", ru: "Вам нравится спорт?", uz: "Sport yoqtiraszmi?", hint: "Share your interest in sports." },
        { q: "What's your favourite sport?", ru: "Какой ваш любимый вид спорта?", uz: "Sevimli sport turingiz qaysi?", hint: "Name a sport and explain why." },
        { q: "Do you often watch sport on TV?", ru: "Вы часто смотрите спорт по телевизору?", uz: "Tez-tez televizorda sport ko'rasizmi?", hint: "Discuss viewing habits." },
        { q: "Did you play sport as a child?", ru: "Вы занимались спортом в детстве?", uz: "Bolaligingizda sport bilan shug'ullandingizmi?", hint: "Talk about childhood activities." },
        { q: "What is the most popular sport in your country?", ru: "Какой самый популярный вид спорта в вашей стране?", uz: "Mamlakatingizda eng mashhur sport turi qaysi?", hint: "Name the national favorite sport." },
        { q: "How do most people in your country keep fit?", ru: "Как большинство людей в вашей стране поддерживают форму?", uz: "Mamlakatingizda odamlar qanday sog'lom bo'ladilar?", hint: "Describe common fitness activities." }
    ],
    technology: [
        { q: "Do you often use a computer?", ru: "Вы часто пользуетесь компьютером?", uz: "Tez-tez kompyuter ishlatasizmi?", hint: "Describe your computer usage." },
        { q: "How do you usually get online?", ru: "Как вы обычно выходите в интернет?", uz: "Odatda qanday internetga kirasiz?", hint: "Mention devices and methods." },
        { q: "What do you use your computer for?", ru: "Для чего вы используете компьютер?", uz: "Kompyuterni nima uchun ishlatasiz?", hint: "List main activities." },
        { q: "Do you think it is important to learn how to use a computer?", ru: "Вы думаете, важно научиться пользоваться компьютером?", uz: "Kompyuter ishlatishni bilish muhimmı?", hint: "Discuss digital literacy." },
        { q: "How often do you go online?", ru: "Как часто вы выходите в интернет?", uz: "Qanchalik tez-tez internetga kirasiz?", hint: "Describe internet usage frequency." },
        { q: "What's your favourite website?", ru: "Какой ваш любимый сайт?", uz: "Sevimli veb-saytingiz qaysi?", hint: "Name a site and explain why." }
    ],
    weather: [
        { q: "What's the weather like today?", ru: "Какая сегодня погода?", uz: "Bugun ob-havo qanday?", hint: "Describe current conditions." },
        { q: "What's your favourite weather?", ru: "Какая ваша любимая погода?", uz: "Sevimli ob-havongiz qanday?", hint: "Name preferred weather and explain." },
        { q: "Do you like the weather in your country?", ru: "Вам нравится погода в вашей стране?", uz: "Mamlakatingizdagi ob-havo yoqadimi?", hint: "Share your opinion." },
        { q: "Does the weather ever affect the way you feel?", ru: "Влияет ли погода на ваше настроение?", uz: "Ob-havo kayfiyatingizga ta'sir qiladimi?", hint: "Discuss mood and weather connection." },
        { q: "Does the weather in your country affect transportation?", ru: "Влияет ли погода на транспорт в вашей стране?", uz: "Ob-havo transportga ta'sir qiladimi?", hint: "Mention weather-related travel issues." }
    ],
    shopping: [
        { q: "Do you like shopping?", ru: "Вам нравится делать покупки?", uz: "Xarid qilishni yoqtirasizmi?", hint: "Share your feelings about shopping." },
        { q: "What's your favourite shop?", ru: "Какой ваш любимый магазин?", uz: "Sevimli do'koningiz qaysi?", hint: "Name a store and explain why." },
        { q: "Do you prefer shopping alone or with others?", ru: "Вы предпочитаете делать покупки один или с другими?", uz: "Yolg'iz yoki boshqalar bilan xarid qilishni yoqtirasizmi?", hint: "Discuss your preference." },
        { q: "Have you ever bought anything online?", ru: "Вы когда-нибудь покупали что-нибудь онлайн?", uz: "Internetdan xarid qilganmisiz?", hint: "Talk about online shopping experience." },
        { q: "Do you think men and women have different opinions about shopping?", ru: "Вы думаете, у мужчин и женщин разные мнения о покупках?", uz: "Erkaklar va ayollar xarid qilish haqida turlicha fikrdalarmı?", hint: "Compare shopping attitudes." }
    ],
    tv: [
        { q: "Do you often watch TV?", ru: "Вы часто смотрите телевизор?", uz: "Tez-tez televizor ko'rasizmi?", hint: "Describe viewing frequency." },
        { q: "What sorts of things do you watch on TV?", ru: "Что вы обычно смотрите по телевизору?", uz: "Televizorda nima ko'rasiz?", hint: "Name program types." },
        { q: "What is your favourite TV program?", ru: "Какая ваша любимая телепрограмма?", uz: "Sevimli teledasturingiz qaysi?", hint: "Name a show and explain why." },
        { q: "Do you ever watch foreign programs or films?", ru: "Вы смотрите иностранные программы или фильмы?", uz: "Xorijiy dasturlar yoki filmlar ko'rasizmi?", hint: "Discuss international content." },
        { q: "What did you watch on TV when you were a child?", ru: "Что вы смотрели по телевизору в детстве?", uz: "Bolaligingizda televizorda nima ko'rdingiz?", hint: "Mention childhood favorites." },
        { q: "Do you think children should watch TV?", ru: "Вы думаете, детям нужно смотреть телевизор?", uz: "Bolalar televizor ko'rishlari kerakmı?", hint: "Give your opinion on children's viewing." }
    ],
    transport: [
        { q: "How did you get here today?", ru: "Как вы сюда добрались сегодня?", uz: "Bugun bu yerga qanday keldingiz?", hint: "Describe your journey method." },
        { q: "What is your favourite mode of transport?", ru: "Какой ваш любимый вид транспорта?", uz: "Sevimli transport turingiz qaysi?", hint: "Choose and explain your preference." },
        { q: "Do you ever use public transport?", ru: "Вы пользуетесь общественным транспортом?", uz: "Jamoat transportidan foydalanasizmi?", hint: "Discuss usage frequency." },
        { q: "Do you like the transport system in your country?", ru: "Вам нравится транспортная система в вашей стране?", uz: "Mamlakatingizdagi transport tizimi yoqadimi?", hint: "Give your opinion." },
        { q: "What is the difference between taking a bus and taking a train?", ru: "В чем разница между автобусом и поездом?", uz: "Avtobus va poyezd o'rtasidagi farq nima?", hint: "Compare the two modes." }
    ],
    art: [
        { q: "Are you good at art?", ru: "Вы хорошо рисуете?", uz: "San'atda yaxshimisiz?", hint: "Describe your artistic ability." },
        { q: "Did you learn art at school when you were a child?", ru: "Вы изучали искусство в школе?", uz: "Maktabda san'atni o'rgandingizmi?", hint: "Talk about art education." },
        { q: "What kind of art do you like?", ru: "Какое искусство вам нравится?", uz: "Qanday san'atni yoqtirasiz?", hint: "Name preferred art forms." },
        { q: "Is art popular in your country?", ru: "Популярно ли искусство в вашей стране?", uz: "San'at mamlakatingizda mashhurmı?", hint: "Discuss art appreciation." },
        { q: "Have you ever been to an art gallery?", ru: "Вы когда-нибудь были в художественной галерее?", uz: "San'at galereyasiga borgansizmi?", hint: "Share gallery experiences." }
    ],
    birthdays: [
        { q: "Do you usually celebrate your birthdays?", ru: "Вы обычно отмечаете свои дни рождения?", uz: "Tug'ilgan kuningizni nishonlaysizmi?", hint: "Describe celebration habits." },
        { q: "How did you celebrate your last birthday?", ru: "Как вы отметили последний день рождения?", uz: "Oxirgi tug'ilgan kuningizni qanday nishonladingiz?", hint: "Recall recent celebration." },
        { q: "Which birthdays are the most important in your country?", ru: "Какие дни рождения самые важные в вашей стране?", uz: "Mamlakatingizda qaysi tug'ilgan kunlar muhim?", hint: "Mention milestone ages." },
        { q: "Do you think children should celebrate birthdays with a party?", ru: "Вы думаете, дети должны отмечать дни рождения праздником?", uz: "Bolalar tug'ilgan kunni bayram qilishlari kerakmı?", hint: "Give your opinion." }
    ],
    childhood: [
        { q: "Did you enjoy your childhood?", ru: "Вам нравилось ваше детство?", uz: "Bolaligingiz yoqimli ecdimi?", hint: "Share overall feelings." },
        { q: "What is your first memory of your childhood?", ru: "Какое ваше первое воспоминание из детства?", uz: "Bolaligingizdan birinchi xotirangiz nima?", hint: "Recall earliest memory." },
        { q: "Did you have a lot of friends when you were a child?", ru: "У вас было много друзей в детстве?", uz: "Bolaligingizda ko'p do'stlaringiz bordimi?", hint: "Describe childhood friendships." },
        { q: "What did you enjoy doing as a child?", ru: "Что вы любили делать в детстве?", uz: "Bolaligingizda nima qilishni yoqtirardingiz?", hint: "Mention favorite activities." }
    ],
    clothes: [
        { q: "What kind of clothes do you usually wear?", ru: "Какую одежду вы обычно носите?", uz: "Odatda qanday kiyim kiyasiz?", hint: "Describe your style." },
        { q: "Do you ever wear traditional clothes of your country?", ru: "Вы носите традиционную одежду вашей страны?", uz: "Milliy kiyimingizni kiyasizmi?", hint: "Discuss traditional attire." },
        { q: "Where do you usually buy your clothes?", ru: "Где вы обычно покупаете одежду?", uz: "Odatda kiyim qayerdan sotib olasiz?", hint: "Name shopping locations." },
        { q: "Have you ever worn a uniform?", ru: "Вы когда-нибудь носили форму?", uz: "Forma kiyganmisiz?", hint: "Talk about uniform experience." }
    ],
    daily_routine: [
        { q: "When do you usually get up in the morning?", ru: "Когда вы обычно встаете утром?", uz: "Odatda ertalab soat nechada turaszmi?", hint: "State your wake-up time." },
        { q: "Do you usually have the same routine every day?", ru: "У вас обычно одинаковый распорядок каждый день?", uz: "Har kuni bir xil rejangiz bormı?", hint: "Describe consistency." },
        { q: "What is your daily routine?", ru: "Какой ваш ежедневный распорядок?", uz: "Kunlik rejangiz qanday?", hint: "Outline typical day." },
        { q: "Do you think it is important to have a daily routine?", ru: "Вы думаете, важно иметь ежедневный распорядок?", uz: "Kunlik reja muhimmı?", hint: "Explain benefits of routine." }
    ],
    family_friends: [
        { q: "Do you spend much time with your family?", ru: "Вы проводите много времени с семьей?", uz: "Oilangiz bilan ko'p vaqt o'tkazasizmi?", hint: "Describe family time." },
        { q: "Who are you closest to in your family?", ru: "С кем вы ближе всего в семье?", uz: "Oilada kimga yaqinsiz?", hint: "Name a family member." },
        { q: "Do you prefer spending time with family or friends?", ru: "Вы предпочитаете проводить время с семьей или друзьями?", uz: "Oilangiz yoki do'stlaringiz bilan vaqt o'tkazish yoqadimi?", hint: "State your preference." },
        { q: "Who is your best friend?", ru: "Кто ваш лучший друг?", uz: "Eng yaqin do'stingiz kim?", hint: "Describe your best friend." },
        { q: "Is family important in your country?", ru: "Семья важна в вашей стране?", uz: "Mamlakatingizda oila muhimmı?", hint: "Discuss family values." }
    ],
    flowers: [
        { q: "Do you like flowers?", ru: "Вам нравятся цветы?", uz: "Gullarni yoqtiraszmi?", hint: "Share your feelings about flowers." },
        { q: "What's your favourite flower?", ru: "Какой ваш любимый цветок?", uz: "Sevimli gulingiz qaysi?", hint: "Name a flower and explain." },
        { q: "When was the last time you gave someone flowers?", ru: "Когда вы в последний раз дарили цветы?", uz: "Oxirgi marta kimga gul berdingiz?", hint: "Recall recent occasion." },
        { q: "Do any flowers have special meaning in your country?", ru: "Есть ли цветы с особым значением в вашей стране?", uz: "Mamlakatingizda maxsus ma'noga ega gullar bormı?", hint: "Mention cultural symbolism." }
    ],
    happiness: [
        { q: "Are you a happy person?", ru: "Вы счастливый человек?", uz: "Baxtli odammisiz?", hint: "Describe your general mood." },
        { q: "What usually makes you happy?", ru: "Что обычно делает вас счастливым?", uz: "Odatda nima sizni baxtli qiladi?", hint: "List sources of joy." },
        { q: "Does the weather ever affect how you feel?", ru: "Влияет ли погода на ваше настроение?", uz: "Ob-havo kayfiyatingizga ta'sir qiladimi?", hint: "Discuss weather's impact on mood." },
        { q: "What makes you smile?", ru: "Что заставляет вас улыбаться?", uz: "Nima sizni tabassum qilishga majbur qiladi?", hint: "Mention things that bring joy." }
    ],
    internet: [
        { q: "How often do you go online?", ru: "Как часто вы выходите в интернет?", uz: "Qanchalik tez-tez internetga kirasiz?", hint: "Describe frequency." },
        { q: "What do you use the internet for?", ru: "Для чего вы используете интернет?", uz: "Internetni nima uchun ishlatasiz?", hint: "List main activities." },
        { q: "How do you get online?", ru: "Как вы выходите в интернет?", uz: "Qanday internetga kirasiz?", hint: "Mention devices used." },
        { q: "Do you think children should have unsupervised internet access?", ru: "Вы думаете, дети должны иметь неконтролируемый доступ в интернет?", uz: "Bolalar nazoratsiz internetdan foydalanishlari kerakmı?", hint: "Give your opinion on child safety." }
    ],
    leisure_time: [
        { q: "What is your favourite leisure activity?", ru: "Какое ваше любимое занятие в свободное время?", uz: "Sevimli dam olish mashg'ulotingiz qanday?", hint: "Name your preferred pastime." },
        { q: "What did you enjoy doing in your free time as a child?", ru: "Что вы любили делать в свободное время в детстве?", uz: "Bolaligingizda bo'sh vaqtingizda nima qilganingiz yoqardi?", hint: "Recall childhood activities." },
        { q: "Do you prefer to spend free time alone or with others?", ru: "Вы предпочитаете проводить свободное время один или с другими?", uz: "Bo'sh vaqtingizni yolg'iz yoki boshqalar bilan o'tkazasizmi?", hint: "State your preference." },
        { q: "Do you think leisure time is important?", ru: "Вы думаете, свободное время важно?", uz: "Bo'sh vaqt muhimmı?", hint: "Discuss the value of relaxation." }
    ],
    neighbours: [
        { q: "Do you like your neighbours?", ru: "Вам нравятся ваши соседи?", uz: "Qo'shnilaringiz yoqadimi?", hint: "Share your feelings." },
        { q: "Are neighbours usually close to each other in your country?", ru: "Соседи обычно близки друг другу в вашей стране?", uz: "Mamlakatingizda qo'shnilar yaqinmı?", hint: "Describe typical relationships." },
        { q: "What is your neighbourhood like?", ru: "Какой ваш район?", uz: "Mahallangiz qanday?", hint: "Describe your area." },
        { q: "Do you think it is important to have a good relationship with neighbours?", ru: "Вы думаете, важно иметь хорошие отношения с соседями?", uz: "Qo'shnilar bilan yaxshi munosabatda bo'lish muhimmı?", hint: "Explain the benefits." }
    ],
    pets: [
        { q: "Do you have a pet?", ru: "У вас есть домашнее животное?", uz: "Uy hayvonlaringiz bormı?", hint: "State if you have one." },
        { q: "Do you like animals?", ru: "Вам нравятся животные?", uz: "Hayvonlarni yoqtiraszmi?", hint: "Share your feelings about animals." },
        { q: "What's your favourite animal?", ru: "Какое ваше любимое животное?", uz: "Sevimli hayvonizingiz qaysi?", hint: "Name an animal and explain." },
        { q: "What is a popular pet in your country?", ru: "Какое популярное домашнее животное в вашей стране?", uz: "Mamlakatingizda qanday uy hayvonlari mashhur?", hint: "Mention common pets." },
        { q: "Why do people have pets?", ru: "Почему люди держат домашних животных?", uz: "Nega odamlar uy hayvonlarini boqadilar?", hint: "Discuss reasons for pet ownership." }
    ],
    patience: [
        { q: "Are you a patient person?", ru: "Вы терпеливый человек?", uz: "Sabr-toqatli odammisiz?", hint: "Describe your patience level." },
        { q: "Do you ever get impatient?", ru: "Вы иногда теряете терпение?", uz: "Ba'zan sabringiz tugaydimi?", hint: "Give examples of when." },
        { q: "When was the last time you lost your patience?", ru: "Когда вы в последний раз потеряли терпение?", uz: "Oxirgi marta sabringiz qachon tugadi?", hint: "Recall a recent incident." },
        { q: "Which person in your family is the most patient?", ru: "Кто в вашей семье самый терпеливый?", uz: "Oilangizda eng sabr-toqatli kim?", hint: "Name a family member." }
    ],
    dreams: [
        { q: "Do you often have dreams when you sleep?", ru: "Вам часто снятся сны?", uz: "Tush ko'rasizmi?", hint: "Describe dream frequency." },
        { q: "Do you usually remember your dreams?", ru: "Вы обычно помните свои сны?", uz: "Tushlaringizni eslaysizmi?", hint: "Talk about dream recall." },
        { q: "Do you ever have daydreams?", ru: "У вас бывают мечты наяву?", uz: "Orzu qilasizmi?", hint: "Discuss daydreaming habits." },
        { q: "What kind of daydreams do you usually have?", ru: "Какие у вас обычно мечты?", uz: "Qanday orzularingiz bor?", hint: "Describe typical daydreams." }
    ]
};

// Add "all" category
questions.all = [];
Object.keys(questions).forEach(k => {
    if (k !== 'all') questions.all.push(...questions[k].map((q, i) => ({ ...q, topic: k, id: `${k}_${i}` })));
});

// ============================================
// IELTS SPEAKING PART 2 - CUE CARD TOPICS
// ============================================

const part2Categories = {
    person: { name: 'Person', icon: '👤', campaign: 'intermediate' },
    place: { name: 'Place', icon: '📍', campaign: 'intermediate' },
    event: { name: 'Event/Experience', icon: '🎉', campaign: 'intermediate' },
    object: { name: 'Object/Item', icon: '📦', campaign: 'beginner' },
    skill: { name: 'Skill/Activity', icon: '🎯', campaign: 'advanced' },
    other: { name: 'Other Topics', icon: '✨', campaign: 'advanced' }
};

const part2Topics = [
    // PERSON TOPICS (20)
    { id: 'p2_person_1', category: 'person', title: 'Describe a person who inspires you', ru: 'Опишите человека, который вас вдохновляет', uz: 'Sizni ilhomlantirgan odamni tasvirlab bering', bullets: ['Who this person is', 'How you know them', 'What they do', 'Why they inspire you'], difficulty: 'intermediate' },
    { id: 'p2_person_2', category: 'person', title: 'Describe an energetic person that you know', ru: 'Опишите энергичного человека, которого вы знаете', uz: 'Siz biladigan baquvvat odamni tasvirlab bering', bullets: ['Who this person is', 'How you know them', 'Why they are energetic', 'How you feel about this person'], difficulty: 'intermediate' },
    { id: 'p2_person_3', category: 'person', title: 'Describe someone you really like to spend time with', ru: 'Опишите человека, с которым вам нравится проводить время', uz: 'Vaqt o\'tkazishni yoqtiradigan odamni tasvirlab bering', bullets: ['Who this person is', 'How you knew them', 'What you usually do together', 'Why you like to spend time with them'], difficulty: 'beginner' },
    { id: 'p2_person_4', category: 'person', title: 'Describe a famous person who is a good role model for youth', ru: 'Опишите известного человека, который является хорошим примером для молодежи', uz: 'Yoshlar uchun yaxshi namuna bo\'lgan mashhur odamni tasvirlab bering', bullets: ['Who this person is', 'What they are famous for', 'How you know about them', 'Why they are a good role model'], difficulty: 'intermediate' },
    { id: 'p2_person_5', category: 'person', title: 'Describe an actor or actress whom you admire', ru: 'Опишите актера или актрису, которым вы восхищаетесь', uz: 'Siz qoyil qoladigan aktryo yoki aktrisani tasvirlab bering', bullets: ['Who they are', 'What they have acted in', 'When you first saw them', 'Why you admire them'], difficulty: 'intermediate' },

    // PLACE TOPICS (20)
    { id: 'p2_place_1', category: 'place', title: 'Describe a place in your country that travelers should visit', ru: 'Опишите место в вашей стране, которое должны посетить путешественники', uz: 'Mamlakatingizdagi sayohatchilar tashrif buyurishi kerak bo\'lgan joyni tasvirlab bering', bullets: ['Where it is', 'What you can see there', 'What you can do there', 'Why you recommend it'], difficulty: 'intermediate' },
    { id: 'p2_place_2', category: 'place', title: 'Describe a house or apartment you find impressive', ru: 'Опишите дом или квартиру, которые произвели на вас впечатление', uz: 'Sizga taassurot qoldirgan uy yoki kvartirani tasvirlab bering', bullets: ['Where it is', 'What it looks like', 'What is special about it', 'Why you find it impressive'], difficulty: 'intermediate' },
    { id: 'p2_place_3', category: 'place', title: 'Describe your favorite relaxing spot at home', ru: 'Опишите ваше любимое место для отдыха дома', uz: 'Uyingizdagi sevimli dam olish joyingizni tasvirlab bering', bullets: ['Where it is', 'What it looks like', 'What you do there', 'Why you find it relaxing'], difficulty: 'beginner' },
    { id: 'p2_place_4', category: 'place', title: 'Describe a crowded place you visited', ru: 'Опишите людное место, которое вы посетили', uz: 'Tashrif buyurgan gavjum joyni tasvirlab bering', bullets: ['Where it is', 'When you went there', 'Who you went with', 'How you felt about it'], difficulty: 'intermediate' },
    { id: 'p2_place_5', category: 'place', title: 'Describe a quiet place you love visiting', ru: 'Опишите тихое место, которое вы любите посещать', uz: 'Tashrif buyurishni yaxshi ko\'radigan sokin joyni tasvirlab bering', bullets: ['Where it is', 'How often you go there', 'What you do there', 'Why you like it'], difficulty: 'beginner' },
    { id: 'p2_place_6', category: 'place', title: 'Describe a place you have been to and would like to recommend to others', ru: 'Опишите место, где вы были, и которое порекомендовали бы другим', uz: 'Borganingiz va boshqalarga tavsiya qilmoqchi bo\'lgan joyingizni tasvirlab bering', bullets: ['Where it is', 'What it is like', 'What you can do there', 'Why you recommend it'], difficulty: 'intermediate' },
    { id: 'p2_place_7', category: 'place', title: 'Describe a countryside area that you have been to', ru: 'Опишите сельскую местность, где вы были', uz: 'Borgan qishloq joyingizni tasvirlab bering', bullets: ['Where it is', 'When you went there', 'What you did there', 'How you felt about it'], difficulty: 'intermediate' },
    { id: 'p2_place_8', category: 'place', title: 'Describe a park or garden in your city', ru: 'Опишите парк или сад в вашем городе', uz: 'Shahringizdagi park yoki bog\'ni tasvirlab bering', bullets: ['Where it is', 'What it looks like', 'How often you go there', 'Why you like it'], difficulty: 'beginner' },
    { id: 'p2_place_9', category: 'place', title: 'Describe a place where there was a lot of noise', ru: 'Опишите место, где было много шума', uz: 'Juda shovqinli bo\'lgan joyni tasvirlab bering', bullets: ['Where it was', 'When you were there', 'What the noise was', 'How you felt about it'], difficulty: 'intermediate' },
    { id: 'p2_place_10', category: 'place', title: 'Describe your ideal home or perfect place to live', ru: 'Опишите ваш идеальный дом или идеальное место для жизни', uz: 'Ideal uyingiz yoki yashamoqchi bo\'lgan joyingizni tasvirlab bering', bullets: ['What it would look like', 'Where it would be', 'Who you would live with', 'Why it would be perfect for you'], difficulty: 'intermediate' },
    { id: 'p2_place_11', category: 'place', title: 'Describe a city you have visited and wish to go back to', ru: 'Опишите город, который вы посетили и хотите вернуться', uz: 'Tashrif buyurgan va qaytmoqchi bo\'lgan shahringizni tasvirlab bering', bullets: ['Which city it is', 'When you visited', 'What you did there', 'Why you want to go back'], difficulty: 'intermediate' },
    { id: 'p2_place_12', category: 'place', title: 'Describe a foreign country you would love to explore someday', ru: 'Опишите иностранное государство, которое вы хотели бы исследовать когда-нибудь', uz: 'Bir kun sayohat qilmoqchi bo\'lgan chet mamlakatni tasvirlab bering', bullets: ['Which country it is', 'How you know about it', 'What you would like to see', 'Why you want to visit'], difficulty: 'advanced' },
    { id: 'p2_place_13', category: 'place', title: 'Describe a historical building you have visited', ru: 'Опишите историческое здание, которое вы посетили', uz: 'Tashrif buyurgan tarixiy binoni tasvirlab bering', bullets: ['Where it is', 'What it looks like', 'What you learned there', 'How you felt about it'], difficulty: 'advanced' },
    { id: 'p2_place_14', category: 'place', title: 'Describe a cafe you like to visit', ru: 'Опишите кафе, которое вы любите посещать', uz: 'Tashrif buyurishni yoqtiradigan kafeni tasvirlab bering', bullets: ['Where it is', 'What it is like', 'How often you go there', 'Why you like it'], difficulty: 'beginner' },
    { id: 'p2_place_15', category: 'place', title: 'Describe a place you went to and did an outdoor activity', ru: 'Опишите место, где вы занимались активным отдыхом на открытом воздухе', uz: 'Borib ochiq havoda mashg\'ulot qilgan joyingizni tasvirlab bering', bullets: ['Where it was', 'When you went there', 'What activity you did', 'How you felt about it'], difficulty: 'intermediate' },
    { id: 'p2_place_16', category: 'place', title: 'Describe a place that has special significance to you', ru: 'Опишите место, имеющее для вас особое значение', uz: 'Siz uchun alohida ahamiyatga ega bo\'lgan joyni tasvirlab bering', bullets: ['Where it is', 'What it looks like', 'Why it is special', 'How often you visit'], difficulty: 'intermediate' },
    { id: 'p2_place_17', category: 'place', title: 'Describe a garden you remember visiting', ru: 'Опишите сад, который вы помните посетив', uz: 'Tashrif buyurganingizni eslaydigan bog\'ni tasvirlab bering', bullets: ['Where it was', 'When you visited', 'What you saw there', 'Why you remember it'], difficulty: 'intermediate' },
    { id: 'p2_place_18', category: 'place', title: 'Describe a place you would like to visit', ru: 'Опишите место, которое вы хотели бы посетить', uz: 'Tashrif buyurmoqchi bo\'lgan joyingizni tasvirlab bering', bullets: ['Where it is', 'How you know about it', 'What you would do there', 'Why you want to visit'], difficulty: 'beginner' },
    { id: 'p2_place_19', category: 'place', title: 'Describe a place in your hometown that is different and you enjoy visiting', ru: 'Опишите место в вашем родном городе, которое отличается и которое вы любите посещать', uz: 'Shahringizdagi boshqacha va tashrif buyurishni yaxshi ko\'radigan joyni tasvirlab bering', bullets: ['Where it is', 'What makes it different', 'How often you go there', 'Why you enjoy visiting'], difficulty: 'intermediate' },
    { id: 'p2_place_20', category: 'place', title: 'Describe a place with a lot of trees', ru: 'Опишите место с большим количеством деревьев', uz: 'Ko\'p daraxtlar bor joyni tasvirlab bering', bullets: ['Where it is', 'What kind of trees there are', 'What you do there', 'How you feel about this place'], difficulty: 'beginner' },

    // EVENT/EXPERIENCE TOPICS (20)
    { id: 'p2_event_1', category: 'event', title: 'Describe a time when you received good news', ru: 'Опишите момент, когда вы получили хорошие новости', uz: 'Yaxshi xabar olgan vaqtingizni tasvirlab bering', bullets: ['What the news was', 'When you received it', 'Who told you', 'How you felt about it'], difficulty: 'beginner' },
    { id: 'p2_event_2', category: 'event', title: 'Describe something that surprised you and made you happy', ru: 'Опишите что-то, что удивило вас и сделало счастливым', uz: 'Sizni hayratda qoldirgan va baxtli qilgan narsani tasvirlab bering', bullets: ['What it was', 'When it happened', 'Who was involved', 'Why it made you happy'], difficulty: 'intermediate' },
    { id: 'p2_event_3', category: 'event', title: 'Describe an important event you celebrated', ru: 'Опишите важное событие, которое вы отпраздновали', uz: 'Nishonlagan muhim voqeangizni tasvirlab bering', bullets: ['What the event was', 'When it happened', 'Who you celebrated with', 'Why it was important'], difficulty: 'intermediate' },
    { id: 'p2_event_4', category: 'event', title: 'Describe a time when you organized a happy event successfully', ru: 'Опишите момент, когда вы успешно организовали счастливое событие', uz: 'Baxtli voqeani muvaffaqiyatli tashkil qilgan vaqtingizni tasvirlab bering', bullets: ['What the event was', 'How you organized it', 'Who attended', 'Why it was successful'], difficulty: 'advanced' },
    { id: 'p2_event_5', category: 'event', title: 'Describe an interesting discussion you had with your friend', ru: 'Опишите интересную дискуссию, которую вы провели с другом', uz: 'Do\'stingiz bilan qilgan qiziqarli suhbatingizni tasvirlab bering', bullets: ['Who you discussed with', 'What you discussed', 'When this happened', 'Why it was interesting'], difficulty: 'intermediate' },
    { id: 'p2_event_6', category: 'event', title: 'Describe something exciting that you did', ru: 'Опишите что-то захватывающее, что вы сделали', uz: 'Qilgan hayajonli ishingizni tasvirlab bering', bullets: ['What you did', 'When you did it', 'Who you were with', 'Why it was exciting'], difficulty: 'intermediate' },
    { id: 'p2_event_7', category: 'event', title: 'Describe a memorable journey you took', ru: 'Опишите запоминающееся путешествие, которое вы совершили', uz: 'Unutilmas sayohatingizni tasvirlab bering', bullets: ['Where you went', 'When you went', 'Who you went with', 'Why it was memorable'], difficulty: 'intermediate' },
    { id: 'p2_event_8', category: 'event', title: 'Describe a time when you helped someone', ru: 'Опишите момент, когда вы помогли кому-то', uz: 'Birovga yordam bergan vaqtingizni tasvirlab bering', bullets: ['Who you helped', 'What you did', 'Why they needed help', 'How you felt about it'], difficulty: 'beginner' },
    { id: 'p2_event_9', category: 'event', title: 'Describe a time you gave or received advice', ru: 'Опишите момент, когда вы давали или получали совет', uz: 'Maslahat bergan yoki olgan vaqtingizni tasvirlab bering', bullets: ['What the advice was', 'Who was involved', 'When this happened', 'What the outcome was'], difficulty: 'intermediate' },
    { id: 'p2_event_10', category: 'event', title: 'Describe an environmental or community event you attended', ru: 'Опишите экологическое или общественное мероприятие, в котором вы участвовали', uz: 'Qatnashgan ekologik yoki jamiyat tadbiringizni tasvirlab bering', bullets: ['What the event was', 'Where it was held', 'Who attended', 'What you did there'], difficulty: 'advanced' },
    { id: 'p2_event_11', category: 'event', title: 'Describe a time when you were late', ru: 'Опишите момент, когда вы опоздали', uz: 'Kech qolgan vaqtingizni tasvirlab bering', bullets: ['When this happened', 'Why you were late', 'What happened', 'How you felt'], difficulty: 'beginner' },
    { id: 'p2_event_12', category: 'event', title: 'Describe a time when you did something to help a child', ru: 'Опишите момент, когда вы сделали что-то, чтобы помочь ребенку', uz: 'Bolaga yordam bergan vaqtingizni tasvirlab bering', bullets: ['Who the child was', 'What you did', 'Why they needed help', 'How you felt'], difficulty: 'intermediate' },
    { id: 'p2_event_13', category: 'event', title: 'Describe a time when you used your phone for something important', ru: 'Опишите момент, когда вы использовали телефон для чего-то важного', uz: 'Telefoningizni muhim ish uchun ishlatgan vaqtingizni tasvirlab bering', bullets: ['What you used it for', 'When this happened', 'Why it was important', 'What the result was'], difficulty: 'intermediate' },
    { id: 'p2_event_14', category: 'event', title: 'Describe a time you were stuck in traffic', ru: 'Опишите момент, когда вы застряли в пробке', uz: 'Tirbandlikda qolgan vaqtingizni tasvirlab bering', bullets: ['When this happened', 'Where you were going', 'How long you waited', 'How you felt'], difficulty: 'beginner' },
    { id: 'p2_event_15', category: 'event', title: 'Describe a time you lost something in public', ru: 'Опишите момент, когда вы потеряли что-то в общественном месте', uz: 'Ommaviy joyda biror narsani yo\'qotgan vaqtingizni tasvirlab bering', bullets: ['What you lost', 'When and where it happened', 'What you did', 'How you felt'], difficulty: 'intermediate' },
    { id: 'p2_event_16', category: 'event', title: 'Describe a time you received money as a gift', ru: 'Опишите момент, когда вы получили деньги в подарок', uz: 'Sovg\'a sifatida pul olgan vaqtingizni tasvirlab bering', bullets: ['When this happened', 'Who gave you money', 'What you did with it', 'How you felt'], difficulty: 'beginner' },
    { id: 'p2_event_17', category: 'event', title: 'Describe a time when someone apologized to you', ru: 'Опишите момент, когда кто-то извинился перед вами', uz: 'Kimdir sizdan uzr so\'ragan vaqtni tasvirlab bering', bullets: ['Who apologized', 'What happened', 'When this occurred', 'How you felt'], difficulty: 'intermediate' },
    { id: 'p2_event_18', category: 'event', title: 'Describe a challenging thing you did', ru: 'Опишите сложную вещь, которую вы сделали', uz: 'Qilgan qiyin ishingizni tasvirlab bering', bullets: ['What you did', 'When you did it', 'Why it was challenging', 'How you felt after'], difficulty: 'intermediate' },
    { id: 'p2_event_19', category: 'event', title: 'Describe a time when the weather prevented you from doing something', ru: 'Опишите момент, когда погода помешала вам что-то сделать', uz: 'Ob-havo biror ishga to\'sqinlik qilgan vaqtni tasvirlab bering', bullets: ['What you planned to do', 'When this happened', 'What the weather was like', 'What you did instead'], difficulty: 'intermediate' },
    { id: 'p2_event_20', category: 'event', title: 'Describe a long car journey you went on', ru: 'Опишите долгое путешествие на машине', uz: 'Uzoq avtomobil sayohatingizni tasvirlab bering', bullets: ['Where you went', 'Who you went with', 'Why you went', 'What made it memorable'], difficulty: 'intermediate' },

    // OBJECT/ITEM TOPICS (15)
    { id: 'p2_object_1', category: 'object', title: 'Describe a piece of technology you use often', ru: 'Опишите устройство, которое вы часто используете', uz: 'Tez-tez ishlatiladigan texnologiyangizni tasvirlab bering', bullets: ['What it is', 'When you got it', 'How you use it', 'Why it is important to you'], difficulty: 'beginner' },
    { id: 'p2_object_2', category: 'object', title: 'Describe a gift you received that was meaningful to you', ru: 'Опишите подарок, который был для вас значимым', uz: 'Siz uchun muhim bo\'lgan sovg\'ani tasvirlab bering', bullets: ['What it was', 'Who gave it to you', 'When you received it', 'Why it was meaningful'], difficulty: 'intermediate' },
    { id: 'p2_object_3', category: 'object', title: 'Describe a book you read that you found useful', ru: 'Опишите книгу, которую вы прочитали и нашли полезной', uz: 'O\'qigan va foydali deb topgan kitobingizni tasvirlab bering', bullets: ['What the book was', 'What it was about', 'When you read it', 'Why it was useful'], difficulty: 'intermediate' },
    { id: 'p2_object_4', category: 'object', title: 'Describe a photo that you took and are proud of', ru: 'Опишите фотографию, которую вы сделали и которой гордитесь', uz: 'Tushirgan va faxrlanish qiladigan rasmingizni tasvirlab bering', bullets: ['What the photo shows', 'When you took it', 'Why you took it', 'Why you are proud of it'], difficulty: 'intermediate' },
    { id: 'p2_object_5', category: 'object', title: 'Describe an object that you think is beautiful', ru: 'Опишите объект, который вы считаете красивым', uz: 'Chiroyli deb hisoblaydigan narsangizni tasvirlab bering', bullets: ['What it is', 'Where it is', 'What it looks like', 'Why you think it is beautiful'], difficulty: 'intermediate' },
    { id: 'p2_object_6', category: 'object', title: 'Describe a piece of clothing you wear most often', ru: 'Опишите предмет одежды, который вы носите чаще всего', uz: 'Eng ko\'p kiyadigan kiyimingizni tasvirlab bering', bullets: ['What it is', 'What it looks like', 'When you wear it', 'Why you like it'], difficulty: 'beginner' },
    { id: 'p2_object_7', category: 'object', title: 'Describe an item of clothing that someone gave you', ru: 'Опишите предмет одежды, который вам подарили', uz: 'Sizga sovg\'a qilingan kiyimni tasvirlab bering', bullets: ['What it is', 'Who gave it to you', 'When you received it', 'How you feel about it'], difficulty: 'intermediate' },
    { id: 'p2_object_8', category: 'object', title: 'Describe a toy you liked in your childhood', ru: 'Опишите игрушку, которая вам нравилась в детстве', uz: 'Bolalikda yoqtirgan o\'yinchoq', bullets: ['What it was', 'Who gave it to you', 'How you played with it', 'Why you liked it'], difficulty: 'beginner' },
    { id: 'p2_object_9', category: 'object', title: 'Describe something you bought that was difficult to use at first', ru: 'Опишите что-то, что вы купили, но сначала было трудно использовать', uz: 'Sotib olgan va dastlab ishlatish qiyin bo\'lgan narsangizni tasvirlab bering', bullets: ['What it was', 'When you bought it', 'Why it was difficult', 'How you learned to use it'], difficulty: 'intermediate' },
    { id: 'p2_object_10', category: 'object', title: 'Describe a useful object in your home that you cannot live without', ru: 'Опишите полезный предмет в вашем доме, без которого вы не можете жить', uz: 'Uyingizdagi hayotingiz uchun zarur bo\'lgan foydali narsangizni tasvirlab bering', bullets: ['What it is', 'What you use it for', 'How often you use it', 'Why you cannot live without it'], difficulty: 'beginner' },
    { id: 'p2_object_11', category: 'object', title: 'Describe an invention that is useful in daily life', ru: 'Опишите изобретение, полезное в повседневной жизни', uz: 'Kundalik hayotda foydali ixtironi tasvirlab bering', bullets: ['What it is', 'How it works', 'How you use it', 'Why it is useful'], difficulty: 'advanced' },
    { id: 'p2_object_12', category: 'object', title: 'Describe a traditional product in your country', ru: 'Опишите традиционный продукт в вашей стране', uz: 'Mamlakatingizdagi an\'anaviy mahsulotni tasvirlab bering', bullets: ['What it is', 'What it is made of', 'Where it is made', 'Why it is important'], difficulty: 'advanced' },
    { id: 'p2_object_13', category: 'object', title: 'Describe something that helps you concentrate', ru: 'Опишите что-то, что помогает вам сосредоточиться', uz: 'Diqqatingizni jamlashga yordam beradigan narsani tasvirlab bering', bullets: ['What it is', 'When you use it', 'How it helps', 'Why you need it'], difficulty: 'intermediate' },
    { id: 'p2_object_14', category: 'object', title: 'Describe a drawing or painting that you like', ru: 'Опишите рисунок или картину, которая вам нравится', uz: 'Yoqtirgan rasm yoki suratni tasvirlab bering', bullets: ['What it shows', 'Where you saw it', 'Who created it', 'Why you like it'], difficulty: 'intermediate' },
    { id: 'p2_object_15', category: 'object', title: 'Describe a good advertisement that you think is useful', ru: 'Опишите хорошую рекламу, которую вы считаете полезной', uz: 'Foydali deb hisoblaydigan yaxshi reklamani tasvirlab bering', bullets: ['What it advertises', 'Where you saw it', 'What it shows', 'Why you think it is useful'], difficulty: 'intermediate' },

    // SKILL/ACTIVITY TOPICS (15)
    { id: 'p2_skill_1', category: 'skill', title: 'Describe a skill that you learned from older people', ru: 'Опишите навык, который вы освоили у старших людей', uz: 'Kattalardan o\'rgangan ko\'nikmangizni tasvirlab bering', bullets: ['What the skill is', 'Who taught you', 'When you learned it', 'How it has helped you'], difficulty: 'intermediate' },
    { id: 'p2_skill_2', category: 'skill', title: 'Describe an activity that you do after school or work', ru: 'Опишите занятие, которым вы занимаетесь после школы или работы', uz: 'Maktab yoki ishdan keyin qiladigan mashg\'ulotingizni tasvirlab bering', bullets: ['What the activity is', 'How often you do it', 'Where you do it', 'Why you enjoy it'], difficulty: 'beginner' },
    { id: 'p2_skill_3', category: 'skill', title: 'Describe a sport you really like', ru: 'Опишите вид спорта, который вам действительно нравится', uz: 'Haqiqatan ham yoqtiradigan sport turingizni tasvirlab bering', bullets: ['What sport it is', 'How you know about it', 'How it is played', 'Why you like it'], difficulty: 'beginner' },
    { id: 'p2_skill_4', category: 'skill', title: 'Describe a skill that was difficult for you to learn', ru: 'Опишите навык, который было трудно освоить', uz: 'O\'rganish qiyin bo\'lgan ko\'nikmani tasvirlab bering', bullets: ['What the skill is', 'Why it was difficult', 'How you learned it', 'How you feel now'], difficulty: 'intermediate' },
    { id: 'p2_skill_5', category: 'skill', title: 'Describe something you do to stay healthy and fit', ru: 'Опишите то, что вы делаете, чтобы оставаться здоровым и в форме', uz: 'Sog\'lom va baquvvat bo\'lish uchun qiladigan ishingizni tasvirlab bering', bullets: ['What you do', 'How often you do it', 'Where you do it', 'Why it helps'], difficulty: 'beginner' },
    { id: 'p2_skill_6', category: 'skill', title: 'Describe a hobby you enjoy in your free time', ru: 'Опишите хобби, которым вы занимаетесь в свободное время', uz: 'Bo\'sh vaqtingizda qiladigan sevimli mashg\'ulotingizni tasvirlab bering', bullets: ['What it is', 'How you started', 'How often you do it', 'Why you enjoy it'], difficulty: 'beginner' },
    { id: 'p2_skill_7', category: 'skill', title: 'Describe a daily routine that you enjoy', ru: 'Опишите ежедневную рутину, которая вам нравится', uz: 'Yoqtirgan kundalik odatingizni tasvirlab bering', bullets: ['What the routine is', 'When you do it', 'How long it takes', 'Why you enjoy it'], difficulty: 'beginner' },
    { id: 'p2_skill_8', category: 'skill', title: 'Describe an outdoor sport you would like to try', ru: 'Опишите вид спорта на открытом воздухе, который вы хотели бы попробовать', uz: 'Sinab ko\'rmoqchi bo\'lgan ochiq havoda sport turini tasvirlab bering', bullets: ['What sport it is', 'How you know about it', 'What equipment you need', 'Why you want to try it'], difficulty: 'intermediate' },
    { id: 'p2_skill_9', category: 'skill', title: 'Describe something you taught to your friend or family member', ru: 'Опишите то, чему вы научили друга или члена семьи', uz: 'Do\'stingiz yoki oila a\'zongizga o\'rgatgan narsangizni tasvirlab bering', bullets: ['What you taught', 'Who you taught', 'How you taught them', 'How they progressed'], difficulty: 'intermediate' },
    { id: 'p2_skill_10', category: 'skill', title: 'Describe an activity that helps you concentrate', ru: 'Опишите занятие, которое помогает вам сосредоточиться', uz: 'Diqqat jamlashtrishga yordam beradigan mashg\'ulotni tasvirlab bering', bullets: ['What the activity is', 'When you do it', 'How it helps', 'Why you need it'], difficulty: 'intermediate' },
    { id: 'p2_skill_11', category: 'skill', title: 'Describe a new skill you learned recently', ru: 'Опишите новый навык, который вы недавно освоили', uz: 'Yaqinda o\'rgangan yangi ko\'nikmangizni tasvirlab bering', bullets: ['What the skill is', 'How you learned it', 'How long it took', 'How you use it now'], difficulty: 'intermediate' },
    { id: 'p2_skill_12', category: 'skill', title: 'Describe a skill you can teach other people', ru: 'Опишите навык, которому вы можете научить других людей', uz: 'Boshqalarga o\'rgata oladigan ko\'nikmangizni tasvirlab bering', bullets: ['What the skill is', 'How you learned it', 'Who you can teach', 'Why it is useful'], difficulty: 'intermediate' },
    { id: 'p2_skill_13', category: 'skill', title: 'Describe something you do regularly that helps you work or study better', ru: 'Опишите то, что вы регулярно делаете, что помогает вам работать или учиться лучше', uz: 'Ishlash yoki o\'qishda yordam beradigan muntazam mashg\'ulotingizni tasvirlab bering', bullets: ['What you do', 'When you do it', 'How it helps', 'Why you started doing it'], difficulty: 'intermediate' },
    { id: 'p2_skill_14', category: 'skill', title: 'Describe a course that you want to learn', ru: 'Опишите курс, который вы хотите пройти', uz: 'O\'rganmoqchi bo\'lgan kursni tasvirlab bering', bullets: ['What course it is', 'Where you can learn it', 'What you will learn', 'Why you want to learn it'], difficulty: 'intermediate' },
    { id: 'p2_skill_15', category: 'skill', title: 'Describe something healthy you enjoy doing', ru: 'Опишите здоровое занятие, которое вам нравится', uz: 'Yoqtiradigan sog\'lom mashg\'ulotingizni tasvirlab bering', bullets: ['What it is', 'How often you do it', 'Who you do it with', 'Why it is healthy'], difficulty: 'beginner' },

    // OTHER TOPICS (10)
    { id: 'p2_other_1', category: 'other', title: 'Describe a rule from your school or workplace that you think is important', ru: 'Опишите правило из школы или работы, которое вы считаете важным', uz: 'Maktab yoki ishdagi muhim deb hisoblaydigan qoidani tasvirlab bering', bullets: ['What the rule is', 'Why it exists', 'How it affects you', 'Why you think it is important'], difficulty: 'advanced' },
    { id: 'p2_other_2', category: 'other', title: 'Describe a branch of science that fascinates you', ru: 'Опишите область науки, которая вас увлекает', uz: 'Sizni qiziqtiradigan fan sohasini tasvirlab bering', bullets: ['What the science is', 'How you know about it', 'What it studies', 'Why it fascinates you'], difficulty: 'advanced' },
    { id: 'p2_other_3', category: 'other', title: 'Describe a positive change in your life', ru: 'Опишите позитивное изменение в вашей жизни', uz: 'Hayotingizdagi ijobiy o\'zgarishni tasvirlab bering', bullets: ['What the change was', 'When it happened', 'How it happened', 'Why it was positive'], difficulty: 'intermediate' },
    { id: 'p2_other_4', category: 'other', title: 'Describe a traditional festival that is important in your country', ru: 'Опишите традиционный праздник, важный в вашей стране', uz: 'Mamlakatingizda muhim bo\'lgan an\'anaviy bayramni tasvirlab bering', bullets: ['What the festival is', 'When it is celebrated', 'What people do', 'Why it is important'], difficulty: 'intermediate' },
    { id: 'p2_other_5', category: 'other', title: 'Describe a movie that made you laugh', ru: 'Опишите фильм, который заставил вас смеяться', uz: 'Sizni kuldirgan filmni tasvirlab bering', bullets: ['What the movie was', 'When you watched it', 'What it was about', 'Why it was funny'], difficulty: 'beginner' },
    { id: 'p2_other_6', category: 'other', title: 'Describe something you got without paying for it', ru: 'Опишите что-то, что вы получили бесплатно', uz: 'Pulsiz olgan narsangizni tasvirlab bering', bullets: ['What it was', 'When you got it', 'Why it was free', 'How you felt about it'], difficulty: 'intermediate' },
    { id: 'p2_other_7', category: 'other', title: 'Describe a change that helps you save time', ru: 'Опишите изменение, которое помогает вам экономить время', uz: 'Vaqtni tejashga yordam beradigan o\'zgarishni tasvirlab bering', bullets: ['What the change is', 'When you made it', 'How it saves time', 'How you feel about it'], difficulty: 'intermediate' },
    { id: 'p2_other_8', category: 'other', title: 'Describe a goal you set and achieved', ru: 'Опишите цель, которую вы поставили и достигли', uz: 'Qo\'ygan va erishgan maqsadingizni tasvirlab bering', bullets: ['What the goal was', 'Why you set it', 'How you achieved it', 'How you felt'], difficulty: 'intermediate' },
    { id: 'p2_other_9', category: 'other', title: 'Describe a difficult decision you made in life', ru: 'Опишите трудное решение, которое вы приняли в жизни', uz: 'Hayotingizda qabul qilgan qiyin qaroringizni tasvirlab bering', bullets: ['What the decision was', 'When you made it', 'Why it was difficult', 'What the outcome was'], difficulty: 'advanced' },
    { id: 'p2_other_10', category: 'other', title: 'Describe a job that you think is interesting', ru: 'Опишите работу, которую вы считаете интересной', uz: 'Qiziqarli deb hisoblaydigan ishni tasvirlab bering', bullets: ['What the job is', 'What people do', 'What skills are needed', 'Why you find it interesting'], difficulty: 'intermediate' }
];

// ============================================
// IELTS SPEAKING PART 3 - DISCUSSION TOPICS
// ============================================

const part3Topics = [
    {
        id: 'p3_education',
        title: 'Education & Learning',
        relatedPart2: ['p2_skill_1', 'p2_skill_4', 'p2_skill_11', 'p2_skill_14'],
        questions: [
            "Do you think schools should teach more practical skills?",
            "How has technology changed the way people learn?",
            "Is it better to study alone or in a group?",
            "Should education be free for everyone?"
        ],
        templates: [
            "From my perspective, I believe that...",
            "It's generally considered that...",
            "One major advantage is...",
            "On the other hand, we must consider..."
        ],
        vocabulary: [
            "Curriculum (n): The subjects comprising a course of study",
            "Pedagogy (n): The method and practice of teaching",
            "Autodidact (n): A self-taught person",
            "Holistic (adj): Characterized by comprehension of the parts of something as intimately interconnected"
        ],
        sample: "I definitely think schools should focus more on practical skills. While academic knowledge is important, life skills like financial literacy, cooking, and basic repairs are essential for independence. For example, knowing how to manage a budget is something every adult needs, yet it's rarely taught in schools."
    },
    {
        id: 'p3_technology',
        title: 'Technology & Society',
        relatedPart2: ['p2_object_1', 'p2_object_11', 'p2_skill_10'],
        questions: [
            "Do you think people rely too much on technology nowadays?",
            "How will technology change our lives in the next 20 years?",
            "What are the dangers of using the internet?",
            "Should children be allowed to use smartphones at school?"
        ],
        templates: [
            "There's no doubt that...",
            "I'm inclined to believe that...",
            "It's a double-edged sword...",
            "Looking at the bigger picture..."
        ],
        vocabulary: [
            "Ubiquitous (adj): Present, appearing, or found everywhere",
            "Obsolete (adj): No longer produced or used; out of date",
            "Innovation (n): A new method, idea, product, etc.",
            "Digital divide (n): The gulf between those who have ready access to computers and the internet, and those who do not"
        ],
        sample: "I believe people have become overly reliant on technology. We use it for everything from navigation to communication, and many people feel lost without their devices. However, this reliance has also made us more efficient and connected. It's a double-edged sword that requires balance."
    },
    {
        id: 'p3_environment',
        title: 'Environment & Pollution',
        relatedPart2: ['p2_place_1', 'p2_place_7', 'p2_place_20', 'p2_event_10'],
        questions: [
            "What are the biggest environmental problems facing your country?",
            "Who is responsible for protecting the environment: the government or individuals?",
            "What can individuals do to help the environment?",
            "Do you think global warming is a serious threat?"
        ],
        templates: [
            "It is undeniable that...",
            "We need to take into account...",
            "A key factor to consider is...",
            "In the long run..."
        ],
        vocabulary: [
            "Sustainability (n): The ability to be maintained at a certain rate or level",
            "Biodiversity (n): The variety of life in the world or in a particular habitat",
            "Carbon footprint (n): The amount of carbon dioxide and other carbon compounds emitted due to the consumption of fossil fuels by a particular person, group, etc.",
            "Renewable energy (n): Energy from a source that is not depleted when used"
        ],
        sample: "I think both the government and individuals share responsibility. The government needs to set regulations and invest in green energy, while individuals should make sustainable choices like recycling and reducing waste. It's a collective effort."
    },
    {
        id: 'p3_travel',
        title: 'Travel & Tourism',
        relatedPart2: ['p2_place_1', 'p2_place_6', 'p2_place_11', 'p2_place_12', 'p2_event_7', 'p2_event_20'],
        questions: [
            "Why do people like to travel?",
            "How has tourism changed in your country in recent years?",
            "What are the benefits of international travel?",
            "Do you think tourism can be harmful to a country?"
        ],
        templates: [
            "Generally speaking...",
            "It's often said that...",
            "From a cultural perspective...",
            "We shouldn't overlook..."
        ],
        vocabulary: [
            "Ecotourism (n): Tourism directed toward exotic, often threatened, natural environments, intended to support conservation efforts",
            "Cultural heritage (n): The legacy of physical artifacts and intangible attributes of a group or society",
            "Globalization (n): The process by which businesses or other organizations develop international influence",
            "Immersion (n): Deep mental involvement"
        ],
        sample: "Travel broadens the mind. It allows people to experience different cultures, try new foods, and see the world from a different perspective. It fosters understanding and tolerance between nations, which is crucial in our globalized world."
    },
    {
        id: 'p3_work',
        title: 'Work & Employment',
        relatedPart2: ['p2_person_1', 'p2_other_10', 'p2_skill_1', 'p2_skill_12'],
        questions: [
            "What factors contribute to job satisfaction?",
            "Is it better to have a high salary or a job you enjoy?",
            "How has the workplace changed in the last few decades?",
            "Do you think robots will replace humans in many jobs?"
        ],
        templates: [
            "It's a controversial issue...",
            "I'm convinced that...",
            "One significant change is...",
            "It stands to reason that..."
        ],
        vocabulary: [
            "Job security (n): The probability that an individual will keep their job",
            "Work-life balance (n): The division of one's time and focus between working and family or leisure activities",
            "Automation (n): The use of largely automatic equipment in a system of manufacturing or other production process",
            "Telecommuting (n): Working from home, making use of the internet, email, and the telephone"
        ],
        sample: "While a high salary is important for financial stability, I believe job satisfaction is more crucial for long-term happiness. Spending 40 hours a week doing something you hate can lead to burnout and stress, regardless of how much you're paid."
    }
];
