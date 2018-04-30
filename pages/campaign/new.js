import React, { Component } from 'react';
import { Button, Form, Input, Card, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes'

class CampaignNew extends Component {

	state = {
		minimumContribution: '',
		errorMessage: '',
		loading: false
	}

	onSubmit = async (event) => {
		event.preventDefault()

		this.setState({ loading: true, errorMesssage: '' })

		try {
		const accounts = await web3.eth.getAccounts();
		await factory.methods
			.createCampaign(this.state.minimumContribution)
			.send({
				from: accounts[0]
			})
			Router.pushRoute('/')
		} catch (err) {
			this.setState({ errorMessage: err.message, visible:true })
		}

		this.setState({ loading: false })
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
					<Message error header="Oops, Something went Wrong!" content={this.state.errorMessage} />
					<Button loading={this.state.loading} primary>Create</Button>
				</Form>
				</Card.Content>
				</Card>
			</Layout>
		)
	}
};

export default CampaignNew;
