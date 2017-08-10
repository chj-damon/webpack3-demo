import React from 'react';
import { Link } from 'react-router';

const ChallengesList = ({ challenges }) => (
    <div>
        {
            challenges.map(challenge => (<div key={challenge.id}>
                <Link to={`/rooms/${challenge.id}`}>{challenge.title}</Link>
            </div>))
        }
    </div>
);
export default ChallengesList;