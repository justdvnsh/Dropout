import React, { Component } from 'react';
import { Button, Form, Input, Card, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory'

class CampaignNew extends Component {

	state = {
		minimumContribution: '',
		errorMessage: '',
		visible: false
	}

	onSubmit = async (event) => {
		event.preventDefault()

		try {
		const accounts = await web3.eth.getAccounts();
		await factory.methods
			.createCampaign(this.state.minimumContribution)
			.send({
				from: accounts[0]
			})
		} catch (err) {
			this.setState({ errorMessage: err.message, visible:true })
		}
	}

	onDismiss = () => {
		this.setState({ visible: false })
	}

	render() {
		return (
			<Layout>
				<h3>New Campaign</h3>
				<Card fluid >
				<Card.Content>
				<Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
					<Form.Field>
						<label>Minimum Contribution</label>
						<Input 
						label="wei"
						labelPosition="right"
						value={this.state.minimumContribution}
						onChange={(event) => {
							this.setState({ minimumContribution: event.target.value })
						}}/>
					</Form.Field>
					<Message error header="Oops, Something went Wrong!" content={this.state.errorMessage} onDismiss={this.onDismiss} />
					<Button primary>Create</Button>
				</Form>
				</Card.Content>
				</Card>
			</Layout>
		)
	}
};

export default CampaignNew;
