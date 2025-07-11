import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { lazy, useEffect, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { items } from './data';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Detail = lazy(() => import('./routes/Detail'));
const Cart = lazy(() => import('./routes/Cart'));

function App() {

	const [cats, setCats] = useState(items);

	useEffect(() => {
		let watched = JSON.parse(localStorage.getItem('watched') || '[]');
		if (watched.length === 0) {
			localStorage.setItem('watched', JSON.stringify([]));
		} else {
			localStorage.setItem('watched', JSON.stringify(watched));
		}
		console.log('watched', watched);
		return () => {
			console.log('clean up');
		}
	}, [cats]);

	useNavigate();
	let navigate = useNavigate();

	let result = useQuery({
		queryKey: ['cats'],
		queryFn: () => {
			return axios.get('https://codingapple1.github.io/userdata.json')
				.then((result) => {
					return result.data;
				})
				.catch(() => {
					console.log('데이터를 불러오는데 실패했습니다.');
				});
		}
	});

	return (
		<div className="App">

			<Navbar bg="dark" data-bs-theme="dark" className="mb-3" expand="lg" fixed="top" collapseOnSelect>
				<Container>
					<Navbar.Brand href="/">F-Sol</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
						<Nav.Link onClick={() => { navigate('/detail') }}>상세페이지</Nav.Link>
						<Nav.Link onClick={() => { navigate('/about') }}>어바웃</Nav.Link>
					</Nav>
					<Nav className="ms-auto">반가워요 kim
						{result.isLoading  && '로딩중...'}
						{result.isError && '에러가 발생했습니다.'}
						{ result.data && result.data.name }
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route path='/' element={
					<div>
						<div className='main-bg'></div>
						<div className="container">
							<div className="row">
								{
									cats.map((a, i) => {
										return <CatCard cat={cats[i]} i={i + 1} key={i} />
									})
								}
							</div>
						</div>
						<Button onClick={() => {
							console.log('더 보기 버튼 클릭: 고양이 API 호출 시작');
							
							axios.get(`http://localhost:3000/cats`)
								.then((result) => {
									console.log('API 응답 데이터:', result.data);
									console.log('API 응답 타입:', Array.isArray(result.data) ? '배열' : typeof result.data);
									
									if (result.data && result.data.data && Array.isArray(result.data.data)) {
										const validCats = result.data.data.filter((cat: any) => 
											cat && typeof cat === 'object' && 
											'name' in cat && 'img' in cat && 'desc' in cat
										);
										
										if (validCats.length > 0) {
											const existingIds = new Set(cats.map((c: { id: number }) => c.id));
											const newCats = validCats.filter((c: { id: number }) => !existingIds.has(c.id));
											
											if (newCats.length > 0) {
												const updatedCats = [...cats, ...newCats];
												setCats(updatedCats);
												console.log(`고양이 데이터 ${newCats.length}개 추가 성공`);
											} else {
												console.log('새로운 고양이 데이터가 없습니다. 모두 이미 로드되었습니다.');
											}
										} else {
											console.log('백엔드에서 받은 데이터에 유효한 고양이 정보가 없습니다.');
										}
									} else {
										console.log('API 응답이 예상한 형식이 아닙니다:', result.data);
										console.log('응답 구조:', JSON.stringify(result.data, null, 2));
									}
								})
								.catch((error) => {
									console.error('고양이 데이터를 불러오는데 실패했습니다:', error);
									alert('데이터를 불러오는데 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
								});
						}}>더 보기</Button>
					</div>} />
				<Route path='/detail' element={<Detail cats={cats} />} >
					<Route path=':id' element={<Detail cats={cats} />} />
				</Route>
				<Route path='/about' element={<About />}>
					<Route path='member' element={<div>멤버임</div>} />
					<Route path='location' element={<div>로케이션임</div>} />
				</Route>
				<Route path="*" element={
					<div>
						<Container>
							<h1>404 Not Found</h1>
							<p>페이지를 찾을 수 없습니다.</p>
						</Container>
					</div>
				} />
				<Route path="/event" element={<EventPage />}>
					<Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
					<Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
				</Route>
				<Route path="/cart" element={<Cart />} />
			</Routes>

		</div>

	)
}

function EventPage() {
	return (
		<div>
			<h4>오늘의 이벤트</h4>
			<Outlet></Outlet>
		</div>
	)
}

function About() {
	return (
		<div>
			<h4>어바웃페이지</h4>
			<p>어바웃페이지 내용이 여기에 들어갑니다.</p>
			<Outlet />
		</div>
	)
}

function CatCard(props: { cat: { name: string; desc: string; age?: number; breed?: string }; i: number }) {
	const navigate = useNavigate();
	return (
		<div className="col-md-4" onClick={() => { navigate(`/detail/${props.i - 1}`) }}>
			<img src={props.cat.img} width="80%" />
			<h4>{props.cat.name}</h4>
			<p>{props.cat.desc}</p>
			{props.cat.age && <p>나이: {props.cat.age}세</p>}
			{props.cat.breed && <p>품종: {props.cat.breed}</p>}
		</div>
	)
}

export default App
