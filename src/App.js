import React, { useState } from 'react';

function App() {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        // fetch를 통해 서버로 데이터 전송
        fetch('서버 API 주소', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the correct content type
            },
            body: JSON.stringify({ content: value }),
        })
            .then(response => response.json())
            .then(data => {
                // 성공적으로 데이터를 전송하면 상태 초기화 또는 리다이렉션 등의 작업 수행
                setValue('');
                console.log('게시글이 성공적으로 작성되었습니다.', data);
            })
            .catch(error => {
                console.error('게시글 작성 중 오류 발생:', error);
            });
    };

    return (
        <div>
            <textarea value={value} onChange={handleChange} />
            <button onClick={handleSubmit}>전송</button>
        </div>
    );
}

export default App;
