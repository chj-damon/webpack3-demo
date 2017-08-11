import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChallenges } from '../redux/actions/challenge';

import ChallengesList from './ChallengesList';

class Home extends PureComponent {
    componentDidMount() {
        if (this.props.challenges.length === 0) {
            this.props.getChallenges();
        }
    }
    render() {
        return (
            <div>
                <ChallengesList 
                    challenges={this.props.challenges}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    challenges: state.challengesReducer.challenges
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getChallenges
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);