import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import reviewApi from '~/apis/review.api';
import { FaStar } from 'react-icons/fa';
import { BaseButtonBlack } from '~/styles/button';

const FormWrapper = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StarsWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Star = styled(FaStar)`
    cursor: pointer;
    margin-right: 5px;
    transition: color 0.2s, transform 0.5s ease-in-out;
    &:hover {
        transform: scale(1.5);
    }
`;

const StyledLabel = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    resize: none;
    min-height: 80px;
`;

const ReviewForm = ({ shoeId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || !comment) {
            toast.error('Vui lòng cung cấp đánh giá và nhận xét');
            return;
        }

        try {
            const response = await reviewApi.createReview({ shoeId, rating, comment });
            if (response.status === 200) {
                toast.success('Gửi đánh giá thành công');
                setRating(0);
                setComment('');
                onReviewSubmitted();
            }
        } catch (error) {
            toast.error('Gửi đánh giá thất bại');
            console.error(error);
        }
    };

    return (
        <FormWrapper>
            <h3>Gửi đánh giá của bạn</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <StyledLabel>Đánh giá:</StyledLabel>
                    <StarsWrapper>
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <Star
                                    key={index}
                                    size={25}
                                    color={ratingValue <= (hover || rating) ? 'gold' : 'gray'}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    onClick={() => setRating(ratingValue)}
                                />
                            );
                        })}
                    </StarsWrapper>
                </div>
                <div>
                    <StyledLabel>Nhận xét:</StyledLabel>
                    <StyledTextarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <BaseButtonBlack type="submit">Gửi</BaseButtonBlack>
            </form>
        </FormWrapper>
    );
};

export default ReviewForm;
