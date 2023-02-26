import React from 'react';
import { Footer, Header, Quiz } from '../../components/index.js';


export default function QuizPage() {
    return (
        <>
            <Header name="Answer the following questions" />
            <Quiz />
            <Footer />
        </>
    );
}