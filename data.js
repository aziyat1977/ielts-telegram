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
