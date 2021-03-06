import React from 'react';
import {Button, Checkbox, Form, Message, Segment, TextArea} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {addStory} from "../../actions/stories";
import {connect} from "react-redux";

class ShareStory extends React.Component {
    state = {
        story: '',
        conditionsChecked: false,
        error: false,
        errorContent:{
            conditionsChecked:{
                header: 'Action Forbidden',
                content: 'Please read the terms and conditions first.'
            },
        },
    };

    handleChange = (e, {name, value}) => this.setState({[name]: e.target.value});
    handleCheckBox = (e) => this.setState({conditionsChecked: !this.state.conditionsChecked});
    handleSubmit = () => {
        if (this.state.conditionsChecked) {
            console.log({story:this.state.story,isModerated:true});
            this.props.addStory({story:this.state.story,isModerated:true});
            this.setState({error: false});
            this.props.history.push('/');
            return
        }
        this.setState({error: true})


    };

    render() {
        // console.log(this.props.history);
        return (
            <div>
                <Segment>
                    <Form onSubmit={this.handleSubmit} error={this.state.error} >

                        <Form.Field style={{minHeight:'15em'}} control={TextArea} name='story' value={this.state.story} label='About'
                                    onChange={this.handleChange} placeholder='Tell us more about you...'/>
                        {/*<Form.Field control={Checkbox} checked={this.state.conditionsChecked}*/}
                                    {/*onChange={this.handleCheckBox} label={termCondition}/>*/}
                        <Form.Field>
                            <Checkbox checked={this.state.conditionsChecked} onChange={this.handleCheckBox} style={{display: 'inline-block'}} />
                            <label style={{display: 'inline-block', marginLeft:'10px'}}>I agree with the <Link to={'/'}>Terms & Condition</Link></label>
                        </Form.Field>
                        <Message
                            error
                            header={this.state.errorContent.conditionsChecked.header}
                            content={this.state.errorContent.conditionsChecked.content}
                        />
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </Segment>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addStory : (story) => dispatch(addStory(story)),
});

export default connect(null,mapDispatchToProps)(ShareStory);