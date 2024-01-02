import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
        en: {
            translation: {
                // English translations here...
                'Register your vehicle': 'Register your vehicle',
                'Route request': 'Route request',
                'View routes': 'View routes',
                'Reporting': 'Reporting',
                'In the car with me': 'In the car with me',
                'We travel freely': 'We travel freely',
                'Search here': 'Search here',
                'Search': 'Search',
                'Categories': 'Categories',
                'Car': 'Car',
                'Garage': 'Garage',
                'Home': 'Home',
                'Account': 'Account',
                'Video': 'Video',
                'Motorcycle': 'Motorcycle',
                'A minibus': 'A minibus',
                'A bus': 'A bus',
                'Select vehicle': 'Select vehicle',
                'English': 'English',
                'Bulgarian': 'Bulgarian',
                'Selected': 'Selected',
                'Continue': 'Continue',
                'Choose how many free places you have:': 'Choose how many free places you have:',
                'Invalid registration number format': 'Invalid registration number format',
                'Registration Number:': 'Registration Number:',
                'Enter Registration Number': 'Enter Registration Number',
                'Invalid Registration Number': 'Invalid Registration Number',
                'Please enter a valid registration number.': 'Please enter a valid registration number.',
                'Home': 'Home',
                'Login': 'Login',
                'Register': 'Register',
                'Vehicle': 'Vehicle',
                'Mark Seats': 'Mark Seats',
                'SelectRoute': 'SelectRoute',
                'Tabs': 'Tabs',
                'Sofia': 'Sofia',
                'Plovdiv': 'Plovdiv',
                'Varna': 'Varna',
                'Burgas': 'Burgas',
                'Select City': 'Select City',
                'Search...': 'Search...',
                'Street': 'Street',
                'Number': 'Number',
                'Departure:': 'Departure:',
                'Departure': 'Departure',
                'Registration Number': 'Registration Number',
                'Marked Seats': 'Marked Seats',
                'Selected Vehicle': 'Selected Vehicle',
                'Date and time of departure': 'Date and time of departure',
                'Selected Vehicle:': 'Selected Vehicle:',
                'Marked Seats:': 'Marked Seats:',
                'Registration Number:': 'Registration Number:',
                'Confirm': 'Confirm',
                'Selected Date and Time:': 'Selected Date and Time:',
                'Selected Date and Time': 'Selected Date and Time',
                'Type': 'Type',
                'Free seats': 'Free seats',
                'Error': 'Error',
                'Please select a street!': 'Please select a street!',
                'Please enter a number!': 'Please enter a number!',
                'Please select a city!': 'Please select a city!',
                'Please select a date and time!': 'Please select a date and time!',
                'No place selected!': 'No place selected!',
                'Please choose how many seats you have available!': 'Please choose how many seats you have available!',
                'Review': 'Review',
                'Town/Village': 'Town/Village',
                'Please select a vehicle before continuing!': 'Please select a vehicle before continuing!',
                'Number': 'Number',
                'Time and date of departure': 'Time and date of departure',
                'Arrival': 'Arrival',
                'Make changes': 'Make changes',
                'Route': 'Route',
                'Departure city address': 'Departure city address',
                'Arrival city address': 'Arrival city address',
                'Free seats': 'Free seats',
                'with registration number': 'with registration number',
                'Departure address': 'Departure address',
                'Arrival address': 'Arrival address',
                'From': 'From',
                'To': 'To',
                'Enter a route': 'Enter a route',
                'Ruse': 'Ruse',
                'Pleven': 'Pleven',
                'Sliven': 'Sliven',
                'Pazardzhik': 'Pazardzhik',
                'Pernik': 'Pernik',
                'Dobrich': 'Dobrich',
                'Shumen': 'Shumen',
                'Veliko Tarnovo': 'Veliko Tarnovo',
                'Haskovo': 'Haskovo',
                'Blagoevgrad': 'Blagoevgrad',
                'Yambol': 'Yambol',
                'Kazanlak': 'Kazanlak',
                'Asenovgrad': 'Asenovgrad',
                'Vratsa': 'Vratsa',
                'Kyustendil': 'Kyustendil',
                'Gabrovo': 'Gabrovo',
                'Targovishte': 'Targovishte',
                'Kardzhali': 'Kardzhali',
                'Vidin': 'Vidin',
                'Razgrad': 'Razgrad',
                'Svishtov': 'Svishtov',
                'Silistra': 'Silistra',
                'Lovech': 'Lovech',
                'Montana': 'Montana',
                'Dimitrovgrad': 'Dimitrovgrad',
                'Dupnitsa': 'Dupnitsa',
                'Smolyan': 'Smolyan',
                'Gorna Oryahovitsa': 'Gorna Oryahovitsa',
                'Petrich': 'Petrich',
                'Gotse Delchev': 'Gotse Delchev',
                'Aytos': 'Aytos',
                'Omurtag': 'Omurtag',
                'Velingrad': 'Velingrad',
                'Isperih': 'Isperih',
                'Karlovo': 'Karlovo',
                'Lom': 'Lom',
                'Panagyurishte': 'Panagyurishte',
                'Botevgrad': 'Botevgrad',
                'Peshtera': 'Peshtera',
                'Rakovski': 'Rakovski',
                'Veleki Preslav': 'Veleki Preslav',
                'Pomorie': 'Pomorie',
                'Lyaskovets': 'Lyaskovets',
                'Novi Pazar': 'Novi Pazar',
                'Provadia': 'Provadia',
                'Razlog': 'Razlog',
                'Zlatograd': 'Zlatograd',
                'Kozloduy': 'Kozloduy',
                'Kostinbrod': 'Kostinbrod',
                'Bankya': 'Bankya',
                'Stamboliyski': 'Stamboliyski',
                'Etropole': 'Etropole',
                'Devnya': 'Devnya',
                'Rakitovo': 'Rakitovo',
                'Sopot': 'Sopot',
                'Septemvri': 'Septemvri',
                'Krichim': 'Krichim',
                'Byala': 'Byala',
                'Aksakovo': 'Aksakovo',
                'Beloslav': 'Beloslav',
                'Slivnitsa': 'Slivnitsa',
                'Elin Pelin': 'Elin Pelin',
                'Madan': 'Madan',
                'Aydemir': 'Aydemir',
                'Devin': 'Devin',
                'Lozen': 'Lozen',
                'Varshets': 'Varshets',
                'Saedinenie': 'Saedinenie',
                'Bistritsa': 'Bistritsa',
                'Bozhurishte': 'Bozhurishte',
                'Suvorovo': 'Suvorovo',
                'Perushtitsa': 'Perushtitsa',
                'Dolna Banya': 'Dolna Banya',
                'Vetovo': 'Vetovo',
                'Kazichene': 'Kazichene',
                'Ignatievo': 'Ignatievo',
                'Kostandovo': 'Kostandovo',
                'Bukovlak': 'Bukovlak',
                'Koynare': 'Koynare',
                'Slavyanovo': 'Slavyanovo',
                'Kalipetrovo': 'Kalipetrovo',
                'Trud': 'Trud',
                'Sveti Vlas': 'Sveti Vlas',
                'Sapareva Banya': 'Sapareva Banya',
                'Malo Konare': 'Malo Konare',
                'Varbitsa': 'Varbitsa',
                'Marten': 'Marten',
                'Debelets': 'Debelets',
                'Vladaya': 'Vladaya',
                'Parvenets': 'Parvenets',
                'Sarnitsa': 'Sarnitsa',
                'Rudozem': 'Rudozem',
                'Topolchane': 'Topolchane',
                'Brestovitsa': 'Brestovitsa',
                'Gulyantsi': 'Gulyantsi',
                'Nikolaevo': 'Nikolaevo',
                'Rogosh': 'Rogosh',
                'Kran': 'Kran',
                'Banya': 'Banya',
                'Topoli': 'Topoli',
                'Pancharevo': 'Pancharevo',
                'Kamenar': 'Kamenar',
                'Gurkovo': 'Gurkovo',
                'Ivaylo': 'Ivaylo',
                'Sotirya': 'Sotirya',
                'Kableshkovo': 'Kableshkovo',
                'Ruen': 'Ruen',
                'Vetren': 'Vetren',
                'Dolna Oryahovitsa': 'Dolna Oryahovitsa',
                'Buhovo': 'Buhovo',
                'Kalofer': 'Kalofer',
                'Voluyak': 'Voluyak',
                'Kalekovets': 'Kalekovets',
                'German': 'German',
                'Nikolovo': 'Nikolovo',
                'Ravda': 'Ravda',
                'Glozhene': 'Glozhene',
                'Novo Selo': 'Novo Selo',
                'Kurtovo Konare': 'Kurtovo Konare',
                'Ablanitsa': 'Ablanitsa',
                'Skutare': 'Skutare',
                'Sadovo': 'Sadovo',
                'Chepintsi': 'Chepintsi',
                'Parvomaytsi': 'Parvomaytsi',
                'Draganovo': 'Draganovo',
                'Kilifarevo': 'Kilifarevo',
                'Ognyanovo': 'Ognyanovo',
                'Valkosel': 'Valkosel',
                'Rakovski': 'Rakovski',
                'Glavinitsa': 'Glavinitsa',
                'Bregovo': 'Bregovo',
                'Svetovrachane': 'Svetovrachane',
                'Aheloy': 'Aheloy',
                'Krushare': 'Krushare',
                'Startsevo': 'Startsevo',
                'Gradina': 'Gradina',
                'Obzor': 'Obzor',
                'Batanovtsi': 'Batanovtsi',
                'Tsaratsovo': 'Tsaratsovo',
                'Borovo': 'Borovo',
                'Voyvodinovo': 'Voyvodinovo',
                'Chernogorovo': 'Chernogorovo',
                'Balgarovo': 'Balgarovo',
                'Petarch': 'Petarch',
                'Kokalyane': 'Kokalyane',
                'Dragichevo': 'Dragichevo',
                'Yahinovo': 'Yahinovo',
                'Ostrovo': 'Ostrovo',
                'Mokrishte': 'Mokrishte',
                'Kraynitsi': 'Kraynitsi',
                'Kostievo': 'Kostievo',
                'Resen': 'Resen',
                'Aleksandrovo': 'Aleksandrovo',
                'Sinitovo': 'Sinitovo',
                'Ezerovo': 'Ezerovo',
                'Graf Ignatievo': 'Graf Ignatievo',
                'Seliminovo': 'Seliminovo',
                'Uzundzhovo': 'Uzundzhovo',
                'Busmantsi': 'Busmantsi',
                'Polikrayshte': 'Polikrayshte',
                'Lesnovo': 'Lesnovo',
                'Merichleri': 'Merichleri',
                'Lyuben Karavelovo': 'Lyuben Karavelovo',
                'Divotino': 'Divotino',
                'Byal Izvor': 'Byal Izvor',
                'Kermen': 'Kermen',
                'Ravnets': 'Ravnets',
                'Kukorevo': 'Kukorevo',
                'Samoranovo': 'Samoranovo',
                'Stozher': 'Stozher',
                'Dzhulyunitsa': 'Dzhulyunitsa',
                'Zheleznitsa': 'Zheleznitsa',
                'Slokoshtitsa': 'Slokoshtitsa',
                'Orizare': 'Orizare',
                'Negovan': 'Negovan',
                'Trivoditsi': 'Trivoditsi',
                'Krepost': 'Krepost',
                'Grivitsa': 'Grivitsa',
                'Studena': 'Studena',
                'Bistritsa': 'Bistritsa',
                'Stratsin': 'Stratsin',
                'Mirovyane': 'Mirovyane',
                'Saraya': 'Saraya',
                'Planinitsa': 'Planinitsa',
                'Krivina': 'Krivina',
                'Karageorgievo': 'Karageorgievo',
                'Prosenik': 'Prosenik',
                'Vinogradets': 'Vinogradets',
                'Tsarev Brod': 'Tsarev Brod',
                'Tankovo': 'Tankovo',
                'Maglen': 'Maglen',
                'Tranak': 'Tranak',
                'Razhitsa': 'Razhitsa',
                'Dzherman': 'Dzherman',
                'Shipka': 'Shipka',
                'Basarbovo': 'Basarbovo',
                'Karabunar': 'Karabunar',
                'Benkovski': 'Benkovski',
                'Kosharitsa': 'Kosharitsa',
                'Konstantinovo': 'Konstantinovo',
                'Yabalchevo': 'Yabalchevo',
                'Galabets': 'Galabets',
                'Chervena Voda': 'Chervena Voda',
                'Veselinovo': 'Veselinovo',
                'Bata': 'Bata',
                'Rudartsi': 'Rudartsi',
                'Dolni Bogrov': 'Dolni Bogrov',
                'Aldomirovtsi': 'Aldomirovtsi',
                'Belogradets': 'Belogradets',
                'Karapelit': 'Karapelit',
                'Novo Selo': 'Novo Selo',
                'Sandrovo': 'Sandrovo',
                'Yabalkovo': 'Yabalkovo',
                'Gabrovnitsa': 'Gabrovnitsa',
                'Vaglen': 'Vaglen',
                'Vardun': 'Vardun',
                'Marchaevo': 'Marchaevo',
                'Banitsa': 'Banitsa',
                'Gorni Bogrov': 'Gorni Bogrov',
                'Semerdzhievo': 'Semerdzhievo',
                'Zaychar': 'Zaychar',
                'Voyvodovo': 'Voyvodovo',
                'Malevo': 'Malevo',
                'Opalchensko': 'Opalchensko',
                'Zvezditsa': 'Zvezditsa',
                'Marinka': 'Marinka',
                'Boboshevo': 'Boboshevo',
                'Gyulyovtsa': 'Gyulyovtsa',
                'Gluhar': 'Gluhar',
                'Hadzhievo': 'Hadzhievo',
                'Pisarevo': 'Pisarevo',
                'Vaklinovo': 'Vaklinovo',
                'Varbitsa': 'Varbitsa',
                'Kladnitsa': 'Kladnitsa',
                'Patalenitsa': 'Patalenitsa',
                'Dolen': 'Dolen',
                'Dobromir': 'Dobromir',
                'Dobri Dyal': 'Dobri Dyal',
                'Gorski Izvor': 'Gorski Izvor',
                'Stefanovo': 'Stefanovo',
                'Borovo': 'Borovo',
                'Cherven Breg': 'Cherven Breg',
                'Snyagovo': 'Snyagovo',
                'Krastava': 'Krastava',
                'Kadievo': 'Kadievo',
                'Voysil': 'Voysil',
                'Vresovo': 'Vresovo',
                'Vinitsa': 'Vinitsa',
                'Mortagonovo': 'Mortagonovo',
                'Izvorsko': 'Izvorsko',
                'Dobroslavtsi': 'Dobroslavtsi',
                'Please choose a photo or video': 'Please choose a photo or video',
                'Report sent successfully:': 'Report sent successfully:',
                'Describe the problem': 'Describe the problem',
                'Enter the vehicle number': 'Enter the vehicle number',
                'Send the Signal': 'Send the Signal',
                'Please choose a photo or video.': 'Please choose a photo or video.',
                'Choose Photo or Video': 'Choose Photo or Video',
                'Submit': 'Submit',
                'Log in': 'Log in',
                'Email': 'Email',
                'Password': 'Password',
                'Create a route': 'Create a route',
                'Register here': 'Register here',
                'Name': 'Name',
                'Password and confirm password do not match': 'Password and confirm password do not match',
                'I have an account': 'I have an account',
                'Create your account': 'Create your account',
                'Create an account': 'Create an account',
                'Add Profile Picture': 'Add Profile Picture',
                'First Name': 'First Name',
                'Enter first name *': 'Enter first name *',
                'Last Name': 'Last Name',
                'Enter last name *': 'Enter last name *',
                'Phone Number': 'Phone Number',
                'Enter phone number': 'Enter phone number',
                'Add your vehicle': 'Add your vehicle',
                'Save changes': 'Save changes',
                'User name': 'User name',
                'Invalid email address': 'Invalid email address',
                'Welcome': 'Welcome',
                'Go next step': 'Go next step',
                'Account settings': 'Account settings',
                'Information about your account': 'Information about your account',
                'Please fill in the fields with': 'Please fill in the fields with',
                'Registration Error': 'Registration Error',
                'Email or username is already taken': 'Email or username is already taken',
                'Please enter a valid email address.': 'Please enter a valid email address.',
                'Login failed.Invalid email or password.': 'Login failed.Invalid email or password.',
                'Change user settings': 'Change user settings',
                'Lets travel': 'Lets travel',
                'Nick name': 'Nick name',
                'Names': 'Names',
                'Еmail': 'Еmail',
                'Logout': 'Logout',
                'Are you sure you want to logout?': 'Are you sure you want to logout?',
                'Yes': 'Yes',
            }
        },
        bg: {
            translation: {
                // Bulgarian translations here...
                'Register your vehicle': 'Регистрирай автомобила си ',
                'Route request': 'Запитване за маршрут',
                'View routes': 'Преглед на маршрутите',
                'Reporting': 'Подаване на сигнал',
                'In the car with me': 'B колата c мен',
                'We travel freely': 'Пътуваме свободно',
                'Search here': 'Търсете тук',
                'Search': 'Търсене ',
                'Categories': 'Категории',
                'Car': 'Лек автомобил',
                'Garage': 'Гараж',
                'Home': 'Дом',
                'Account': 'Акаунт',
                'Video': 'Видео',
                'Motorcycle': 'Мотоциклет',
                'A minibus': 'Микробус',
                'A bus': 'Автобус',
                'Select vehicle': 'Изберете превозно средство',
                'English': 'Английски',
                'Bulgarian': 'Български',
                'Selected': 'Избрано',
                'Continue': 'Продължи',
                'Choose how many free places you have:': 'Изберете колко свободни места имате:',
                'Invalid registration number format': 'Невалиден формат на регистрационния номер',
                'Registration Number:': 'Регистрационен номер:',
                'Enter Registration Number': 'Въведете регистрационен номер',
                'Invalid Registration Number': 'Невалиден регистрационен номер',
                'Please enter a valid registration number.': 'Моля, въведете валиден регистрационен номер.',
                'Home': 'Дом',
                'Login': 'Влизане',
                'Register': 'Регистрирам',
                'Vehicle': 'Превозно средство',
                'Mark Seats': 'Маркирайте места',
                'SelectRoute': 'Изберете Маршрут',
                'Tabs': 'Раздели',
                'Sofia': 'София',
                'Plovdiv': 'Пловдив',
                'Varna': 'Варна',
                'Burgas': 'Бургас',
                'Select City': 'Изберете Град',
                'Search...': 'Търсене...',
                'Street': 'Улица',
                'Number': 'Номер',
                'Departure:': 'Заминаване:',
                'Departure': 'Заминаване',
                'Registration Number': 'Регистрационен номер',
                'Marked Seats': 'Маркирани места',
                'Selected Vehicle': 'Избрано превозно средство',
                'Date and time of departure': 'Дата и час на заминаване',
                'Selected Vehicle:': 'Избрано превозно средство:',
                'Marked Seats:': 'Маркирани места:',
                'Registration Number:': 'Регистрационен номер:',
                'Confirm': 'Потвърдете',
                'Selected Date and Time:': 'Избрани дата и час:',
                'Selected Date and Time': 'Избрани дата и час',
                'Type': 'Тип',
                'Free seats': 'Свободни места',
                'Error': 'Грешка',
                'Please select a street!': 'Моля, изберете улица!',
                'Please enter a number!': 'Моля, посочете номер!',
                'Please select a city!': 'Моля, изберете град!',
                'Please select a date and time!': 'Моля , изберете дата и час !',
                'No place selected!': 'Няма избрано място !',
                'Please choose how many seats you have available!': 'Моля , изберете с колко места разполагате !',
                'Review': 'Преглед',
                'Town/Village': 'Град/Село',
                'Please select a vehicle before continuing!': 'Моля, изберете превозно средство, преди да продължите!',
                'Number': 'Номер',
                'Time and date of departure': 'Час и дата на потегляне',
                'Arrival': 'Пристигане ',
                'Make changes': 'Направи промени',
                'Route': 'Маршрут',
                'Departure city address': 'Град на заминаване адрес',
                'Arrival city address': 'Град на пристигане адрес',
                'Free seats': 'Свободни места',
                'with registration number': 'с регистрационен номер',
                'Departure address': 'Aдрес на заминаване',
                'Arrival address': 'Адрес на пристигане',
                'From': 'От',
                'To': 'До',
                'Enter a route': 'Въведете маршрут',
                'Ruse': 'Русе',
                'Pleven': 'Плевен',
                'Sliven': 'Сливен',
                'Pazardzhik': 'Пазарджик',
                'Pernik': 'Перник',
                'Dobrich': 'Добрич',
                'Shumen': 'Шумен',
                'Veliko Tarnovo': 'Велико Търново',
                'Haskovo': 'Хасково',
                'Blagoevgrad': 'Благоевград',
                'Yambol': 'Ямбол',
                'Kazanlak': 'Казанлък',
                'Asenovgrad': 'Асеновград',
                'Vratsa': 'Враца',
                'Kyustendil': 'Кюстендил',
                'Gabrovo': 'Габрово',
                'Targovishte': 'Търговище',
                'Kardzhali': 'Кърджали',
                'Vidin': 'Видин',
                'Razgrad': 'Разград',
                'Svishtov': 'Свищов',
                'Silistra': 'Силистра',
                'Lovech': 'Ловеч',
                'Montana': 'Монтана',
                'Dimitrovgrad': 'Димитровград',
                'Dupnitsa': 'Дупница',
                'Smolyan': 'Смолян',
                'Gorna Oryahovitsa': 'Горна Оряховица',
                'Petrich': 'Петрич',
                'Gotse Delchev': 'Гоце Делчев',
                'Aytos': 'Айтос',
                'Omurtag': 'Омуртаг',
                'Velingrad': 'Велинград',
                'Isperih': 'Исперих',
                'Karlovo': 'Карлово',
                'Lom': 'Лом',
                'Panagyurishte': 'Панагюрище',
                'Botevgrad': 'Ботевград',
                'Peshtera': 'Пещера',
                'Rakovski': 'Раковски',
                'Veliki Preslav': 'Велики Преслав',
                'Pomorie': 'Поморие',
                'Lyaskovets': 'Лясковец',
                'Novi Pazar': 'Нови Пазар',
                'Provadia': 'Провадия',
                'Razlog': 'Разлог',
                'Zlatograd': 'Златоград',
                'Kozloduy': 'Козлодуй',
                'Kostinbrod': 'Костинброд',
                'Bankya': 'Банкя',
                'Stamboliyski': 'Стамболийски',
                'Etropole': 'Етрополе',
                'Devnya': 'Девня',
                'Rakitovo': 'Ракитово',
                'Sopot': 'Сопот',
                'Septemvri': 'Септември',
                'Krichim': 'Кричим',
                'Byala': 'Бяла',
                'Aksakovo': 'Аксаково',
                'Beloslav': 'Белослав',
                'Slivnitsa': 'Сливница',
                'Elin Pelin': 'Елин Пелин',
                'Madan': 'Мадан',
                'Aydemir': 'Айдемир',
                'Devin': 'Девин',
                'Lozen': 'Лозен', 'Varshets': 'Вършец',
                'Saedinenie': 'Съединение',
                'Bistritsa': 'Бистрица',
                'Bozhurishte': 'Божурище',
                'Suvorovo': 'Суворово',
                'Perushtitsa': 'Перущица',
                'Dolna Banya': 'Долна Баня',
                'Vetovo': 'Ветово',
                'Kazichene': 'Казичене',
                'Ignatievo': 'Игнатиево',
                'Kostandovo': 'Костандово',
                'Bukovlak': 'Буковлък',
                'Koynare': 'Койнаре',
                'Slavyanovo': 'Славяново',
                'Kalipetrovo': 'Калипетрово',
                'Trud': 'Труд',
                'Sveti Vlas': 'Свети Влас',
                'Sapareva Banya': 'Сапарева Баня',
                'Malo Konare': 'Мало Конаре',
                'Varbitsa': 'Върбица',
                'Marten': 'Мартен',
                'Debelets': 'Дебелец',
                'Vladaya': 'Владая',
                'Parvenets': 'Първенец',
                'Sarnitsa': 'Сърница',
                'Rudozem': 'Рудозем',
                'Topolchane': 'Тополчане',
                'Brestovitsa': 'Брестовица',
                'Gulyantsi': 'Гулянци',
                'Nikolaevo': 'Николаево',
                'Rogosh': 'Рогош',
                'Kran': 'Крън',
                'Banya': 'Баня',
                'Topoli': 'Тополи',
                'Pancharevo': 'Панчарево',
                'Kamenar': 'Каменар',
                'Gurkovo': 'Гурково',
                'Ivaylo': 'Ивайло',
                'Sotirya': 'Сотиря',
                'Kableshkovo': 'Каблешково',
                'Ruen': 'Руен',
                'Vetren': 'Ветрен',
                'Dolna Oryahovitsa': 'Долна Оряховица',
                'Buhovo': 'Бухово',
                'Kalofer': 'Калофер',
                'Voluyak': 'Волуяк',
                'Kalekovets': 'Калековец',
                'German': 'Герман',
                'Nikolovo': 'Николово',
                'Ravda': 'Равда',
                'Glozhene': 'Гложене',
                'Novo Selo': 'Ново Село',
                'Kurtovo Konare': 'Куртово Конаре',
                'Ablanitsa': 'Абланица',
                'Skutare': 'Скутаре',
                'Sadovo': 'Садово',
                'Chepintsi': 'Чепинци',
                'Parvomaytsi': 'Първомайци',
                'Draganovo': 'Драганово',
                'Kilifarevo': 'Килифарево',
                'Ognyanovo': 'Огняново',
                'Valkosel': 'Вълкосел',
                'Rakovski': 'Раковски',
                'Glavinitsa': 'Главиница',
                'Bregovo': 'Брегово',
                'Svetovrachane': 'Световрачане',
                'Aheloy': 'Ахелой',
                'Krushare': 'Крушаре',
                'Startsevo': 'Старцево',
                'Gradina': 'Градина',
                'Obzor': 'Обзор',
                'Batanovtsi': 'Батановци',
                'Tsaratsovo': 'Царацово',
                'Borovo': 'Борово',
                'Voyvodinovo': 'Войводиново',
                'Chernogorovo': 'Черногорово',
                'Balgarovo': 'Българово',
                'Petarch': 'Петърч',
                'Kokalyane': 'Кокаляне',
                'Dragichevo': 'Драгичево',
                'Yahinovo': 'Яхиново',
                'Ostrovo': 'Острово',
                'Mokrishte': 'Мокрище',
                'Kraynitsi': 'Крайници',
                'Kostievo': 'Костиево',
                'Resen': 'Ресен',
                'Aleksandrovo': 'Александрово',
                'Sinitovo': 'Синитово',
                'Ezerovo': 'Езерово',
                'Graf Ignatievo': 'Граф Игнатиево',
                'Seliminovo': 'Селиминово',
                'Uzundzhovo': 'Узунджово',
                'Busmantsi': 'Бусманци',
                'Polikrayshte': 'Поликрайще',
                'Lesnovo': 'Лесново',
                'Merichleri': 'Меричлери',
                'Lyuben Karavelovo': 'Любен Каравелово',
                'Divotino': 'Дивотино',
                'Byal Izvor': 'Бял Извор',
                'Kermen': 'Кермен',
                'Ravnets': 'Равнец',
                'Kukorevo': 'Кукорево',
                'Samoranovo': 'Самораново',
                'Stozher': 'Стожер',
                'Dzhulyunitsa': 'Джулюница',
                'Zheleznitsa': 'Железница',
                'Slokoshtitsa': 'Слокощица',
                'Orizare': 'Оризаре',
                'Negovan': 'Негован',
                'Trivoditsi': 'Триводици',
                'Krepost': 'Крепост',
                'Grivitsa': 'Гривица',
                'Studena': 'Студена',
                'Bistritsa': 'Бистрица',
                'Stratsin': 'Страцин',
                'Mirovyane': 'Мировяне',
                'Saraya': 'Сарайа',
                'Planinitsa': 'Планиница',
                'Krivina': 'Кривина',
                'Karageorgievo': 'Карагеоргиево',
                'Prosenik': 'Прошеник',
                'Vinogradets': 'Виноградец',
                'Tsarev Brod': 'Царев Брод',
                'Tankovo': 'Танково',
                'Maglen': 'Мъглен',
                'Tranak': 'Трънак',
                'Razhitsa': 'Раждица',
                'Dzherman': 'Джерман',
                'Shipka': 'Шипка',
                'Basarbovo': 'Басарбово',
                'Karabunar': 'Карабунар',
                'Benkovski': 'Бенковски',
                'Kosharitsa': 'Кошарица',
                'Konstantinovo': 'Константиново',
                'Yabalchevo': 'Ябълчево',
                'Galabets': 'Гълъбец',
                'Chervena Voda': 'Червена Вода',
                'Veselinovo': 'Веселиново',
                'Bata': 'Бата',
                'Rudartsi': 'Рударци',
                'Dolni Bogrov': 'Долни Богров',
                'Aldomirovtsi': 'Алдомировци',
                'Belogradets': 'Белоградец',
                'Karapelit': 'Карапелит',
                'Novo Selo': 'Ново Село',
                'Sandrovo': 'Сандрово',
                'Yabalkovo': 'Ябълково',
                'Gabrovnitsa': 'Габровница',
                'Vaglen': 'Въглен',
                'Vardun': 'Върдун',
                'Marchaevo': 'Марчаево',
                'Banitsa': 'Баница',
                'Gorni Bogrov': 'Горни Богров',
                'Semerdzhievo': 'Семерджиево',
                'Zaychar': 'Зайчар',
                'Voyvodovo': 'Войводово',
                'Malevo': 'Малево',
                'Opalchensko': 'Опълченско',
                'Zvezditsa': 'Звездица',
                'Marinka': 'Маринка',
                'Boboshevo': 'Бобошево',
                'Gyulyovtsa': 'Гюлювца',
                'Gluhar': 'Глухар',
                'Hadzhievo': 'Хаджиево',
                'Pisarevo': 'Писарево',
                'Vaklinovo': 'Ваклиново',
                'Varbitsa': 'Върбица',
                'Kladnitsa': 'Кладница',
                'Patalenitsa': 'Паталеница',
                'Dolen': 'Долен',
                'Dobromir': 'Добромир',
                'Dobri Dyal': 'Добри дял',
                'Gorski Izvor': 'Горски Извор',
                'Stefanovo': 'Степаново',
                'Borovo': 'Борово',
                'Cherven Breg': 'Червен Брег',
                'Snyagovo': 'Снягово',
                'Krastava': 'Крастава',
                'Kadievo': 'Къдево',
                'Voysil': 'Войсил',
                'Vresovo': 'Вресово',
                'Vinitsa': 'Виница',
                'Mortagonovo': 'Мортагоново',
                'Izvorsko': 'Изворско',
                'Dobroslavtsi': 'Доброславци',
                'Please choose a photo or video': 'Моля, изберете снимка или видео',
                'Report sent successfully:': 'Докладът е изпратен успешно:',
                'Describe the problem': 'Опишете проблема',
                'Enter the vehicle number': 'Въведете номера на автомобила',
                'Send the Signal': 'Изпратете сигнала',
                'Please choose a photo or video.': 'Моля, изберете снимка или видеоклип.',
                'Choose Photo or Video': 'Изберете Снимка или Видео',
                'Submit': 'Изпращане',
                'Log in': 'Влизам',
                'Email': 'Имейл',
                'Password': 'Парола',
                'Create a route': 'Създайте маршрут',
                'Register here': 'Направи регистрация тук',
                'Name': 'Име',
                'Password and confirm password do not match': 'Паролата и паролата за потвърждение не съвпадат',
                'I have an account': 'Имам акаунт',
                'Create your account': 'Създай  си акаунта',
                'Create an account': 'Създаване на акаунт',
                'Add Profile Picture': 'Добавяне на профилна снимка',
                'First Name': 'Име',
                'Enter first name *': 'Въведете собствено име *',
                'Last Name': 'Фамилия',
                'Enter last name *': 'Въведете фамилия *',
                'Phone Number': 'Телефонен номер',
                'Enter phone number': 'Въведете телефонен номер',
                'Add your vehicle': 'Добавете автомобила си',
                'Save changes': 'Запазите промените',
                'User name': 'Потребителско име',
                'Invalid email address': 'Невалиден имейл адрес',
                'Welcome': 'Добре дошли',
                'Go next step': 'Отидете на следващата стъпка',
                'Account settings': 'Настройки на акаунта',
                'Information about your account': 'Информация за вашият акаунт',
                'Please fill in the fields with': 'Моля попълнете полета с *',
                'Registration Error': 'Грешка при регистрация',
                'Email or username is already taken': 'Имейлът или потребителското име вече са заети',
                'Please enter a valid email address.': 'Моля, въведете валиден имейл адрес.',
                'Login failed.Invalid email or password.': 'Неуспешно влизане. Невалиден имейл или парола.',
                'Change user settings': 'Промяна на потребителските настройки',
                'Lets travel': 'Хайде да пътуваме',
                'Nick name': 'Псевдоним',
                'Names': 'Имена',
                'Еmail': 'Eлектронна поща',
                'Logout': 'Излез от профила си',
                'Are you sure you want to logout?': 'Сигурни ли сте, че искате да излезете?',
                'Yes': 'Да',
            }
        },
    }
});

export default i18next;
