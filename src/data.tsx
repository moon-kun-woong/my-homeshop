export interface CatItem {
    id: number;
    name: string;
    img: string;
    desc: string;
    age?: number;
    breed?: string;
}

export const items: CatItem[] = [
    {
        id: 0,
        name: '권준원',
        img: 'https://img.danawa.com/images/descFiles/6/171/5170301_T5FDbnvG5s_1666052770335.jpeg',
        desc: '코리안 숏헤어',
        age: 3,
        breed: '코리안 숏헤어'
    },
    {
        id: 1,
        name: '허준무',
        img: 'https://images.mypetlife.co.kr/content/uploads/2019/08/09153241/cat-2182624_1920.jpg',
        desc: '페르시안',
        age: 2,
        breed: '페르시안'
    },
    {
        id: 2,
        name: '문건웅',
        img: 'http://www.yomicat.co.kr/preSaleUpFile/240328_%E1%84%80%E1%85%AA%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC%E1%84%83%E1%85%A6%E1%84%87%E1%85%A9%E1%86%AB%E1%84%85%E1%85%A6%E1%86%A8%E1%84%89%E1%85%B3_63867.jpg',
        desc: '브리티시 숏헤어',
        age: 4,
        breed: '브리티시 숏헤어'
    }
];

export default items;