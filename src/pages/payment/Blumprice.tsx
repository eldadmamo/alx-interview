import { useState } from 'react';
import axios from 'axios';

const SubscriptionPage = () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/subscribe', {
                userId: 'USER_ID', // Replace with actual userId
                plan: selectedPlan // Pass the selected plan
            });

            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl; // Redirect to Chapa payment page
            }
        } catch (error) {
            console.log('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Select a Subscription Plan</h1>
            <div>
                <label>
                    <input
                        type="radio"
                        name="plan"
                        value="basic"
                        checked={selectedPlan === 'basic'}
                        onChange={() => setSelectedPlan('basic')}
                    />
                    Basic Plan (300 Birr)
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="plan"
                        value="premium"
                        checked={selectedPlan === 'premium'}
                        onChange={() => setSelectedPlan('premium')}
                    />
                    Premium Plan (500 Birr)
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="plan"
                        value="ultimate"
                        checked={selectedPlan === 'ultimate'}
                        onChange={() => setSelectedPlan('ultimate')}
                    />
                    Ultimate Plan (700 Birr)
                </label>
            </div>
            <button onClick={handleSubscribe} disabled={loading}>
                {loading ? 'Processing...' : 'Subscribe'}
            </button>
        </div>
    );
};

export default SubscriptionPage;
