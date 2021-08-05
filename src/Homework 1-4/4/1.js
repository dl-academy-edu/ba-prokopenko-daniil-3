const developers = [
    {
        index:0,
        name:"Брендан Эйх",
        work: "специалист в области информатики, программист, технический директор"
    },
    {
        index:2,
        name: "Джеймс Гослинг",
        work: "специалист в области информационных технологий"
    },
    {
        index:3,
        name: "Бьёрн Страуструп",
        work: "программист"
    }
]
  
const data = [
    {
        name:"JavaScript",
        year: 1995,
        filenameExtensions: "js, mjs",
        influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
        affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
        developerIndex:0,
    },
    {
        name:"Java",
        year: 1995,
        filenameExtensions: "java, class, jar, jad, jmod",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
        developerIndex: 2,
    },
    {
        name:"C++",
        year: 1983,
        filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada", "C", "Modula-2", "Simula"],
        developerIndex: 3,
    },
];
  
let delay = 10;
alert(`Информация будет выведена через ${delay} секунд в консоль!`);
for (let i = 0; i < delay; i++) {
    let step;
    step = i*1000;
    let timer = setTimeout(() => {
        console.log(delay - i)
    }, step);
};
let launch = setTimeout(() => {
    for (let i = 0; i < 3; i++) {
        console.log(` `);
        printLanguageStory(i);
    }
}, (delay*1000));

function printLanguageStory (languageNumber) {
    let languageName = data[languageNumber].name;
    let languageYearOfRelease = data[languageNumber].year;
    let languageDeveloperName = developers[languageNumber].name;
    let languageDeveloperWork = developers[languageNumber].work;
    let languageFileExtensions = "." + data[languageNumber].filenameExtensions.split(", ").join(", .");
    let languagesInfluencedByQty = data[languageNumber].influencedBy.length;
    let languagesInfluencedBy = languagesInfluencedByQty > 4 ? 
        data[languageNumber].influencedBy.slice(0, 4).join(", ") + " и другие языки программирования" : 
        data[languageNumber].influencedBy.join(", ");
    let languagesAffectedBy = data[languageNumber].affectedBy.join(", ");
    console.log(`${languageName} - язык программирования, выпущенный в ${languageYearOfRelease} году.`);
    console.log(`Автором языка программирования стал ${languageDeveloperName} - ${languageDeveloperWork}.`);
    console.log(`Файлы программ, написанных на ${languageName}, могут иметь расширения ${languageFileExtensions}.`);
    console.log(`${languageName} испытал влияние ${languagesInfluencedByQty} языков программирования: ${languagesInfluencedBy}.`);
    console.log(`${languageName} повлиял на ${languagesAffectedBy}.`);
};