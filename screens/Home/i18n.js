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
                'Login': 'Влизам',
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
            }
        },
    }
});

export default i18next;
