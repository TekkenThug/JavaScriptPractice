const employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

let employersNames = employers.filter(human => human).map(human => human.toLowerCase().trim());

const sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

const {cash, eu, rus} = sponsors;
const sumSponsors = [...eu, ...rus, 'unexpected sponsor'];

const calcCash = (everyCash) => {
    return everyCash.reduce((sum, current) => {return sum + current });
}

const money = calcCash(cash);

const makeBusiness = ({cash, emp, owner = "Sam", director = "Victor"}) => {
    console.log(`We have a business. Owner: ${owner}, director: ${director}. Our budget: ${cash}. And our employers: ${
    emp}`);
    console.log(`And we have a sponsors: ${sumSponsors}`);
    console.log(`Note. Be careful with ${eu[0]}. It's a huge risk.`);
}

makeBusiness({cash: money, emp: employersNames});



