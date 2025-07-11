import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import type { CatItem } from "../data";

let BlueBtn = styled.button`
  background: skyBlue;
  color: black;
  padding: 10px;`

let CustomBtn = styled.button`
  background: ${props => props.bg || 'blue'};
  color: black;
  padding: 10px;`

let BlackCheckBox = styled.input.attrs({ type: 'text' })`
  background: black;
  color: white;
  width: 400px;
  height: 20px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    background: gray;
    color: black;
    }
    &:focus {
      background: white;
      color: black;
      }`

let Box = styled.div`
  padding: 20px;
  background: lightgray;`

function Detail(props: { cats: CatItem[] }) {

	let {id} = useParams();
	let numId = Number(id) || 0;
	let foundCat = props.cats.find((cat) => cat.id === numId);
	let [tab, setTab] = useState(0)
	let dispatch = useDispatch();

	useEffect(() => {
		if (!foundCat) return;
		
		let watched = JSON.parse(localStorage.getItem('watched') || '[]');
		watched.push(foundCat);
		const watchedStringSet = new Set<string>();
		const uniqueWatched = watched.filter((item: any) => {
			if (!item) return false;
			const itemStr = JSON.stringify(item);
			if (!watchedStringSet.has(itemStr)) {
				watchedStringSet.add(itemStr);
				return true;
			}
			return false;
		});
		localStorage.setItem('watched', JSON.stringify(uniqueWatched));
		return () => {
			console.log('clean up');
		}
	}, [foundCat]);


	let [count, setCount] = useState(0);

	return (
		<div className="container">
			<Box>
				<BlueBtn>스타일드 버튼</BlueBtn>
				<br />
				<BlackCheckBox />
				<br />
				<CustomBtn bg="orange">커스텀 버튼</CustomBtn>
			</Box>
			{count}
			<button onClick={() => { setCount(count + 1) }}></button>
			{foundCat ? (
				<div className="row">
					<div className="col-md-6">
						<img src={foundCat.img} width="100%" />
					</div>
					<div className="col-md-6 mt-4">
						<h4 className="pt-5">{foundCat.name}</h4>
						<p>{foundCat.desc}</p>
						{foundCat.age && <p>나이: {foundCat.age}세</p>}
						{foundCat.breed && <p>품종: {foundCat.breed}</p>}
						<button className="btn btn-danger">주문하기</button>
					</div>
				</div>
			) : (
				<div className="alert alert-warning">
					고양이 정보를 찾을 수 없습니다.
				</div>
			)}

			<Nav variant="tabs" defaultActiveKey="link0">
				<Nav.Item>
					<Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
				</Nav.Item>
			</Nav>
			<TabContent tab={tab} />
		</div >
	);
}

function TabContent(props: { tab: number }) {
	let [fade, setFade] = useState('')
	useEffect(() => {
		setTimeout(() => {
			setFade('end')
		}, 100);
		return () => {
			setFade('')
		}
	}, [props.tab]);
	
	return (<div className={`start ${fade}`}>
		{[<div>내용000000000</div>,
		<div>내용11111111111111</div>,
		<div>내용22222222222222222222222</div>][props.tab]}
	</div>)
}

export default Detail;