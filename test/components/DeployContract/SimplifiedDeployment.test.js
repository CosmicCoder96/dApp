import React from 'react';
import { Steps } from 'antd';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import {
  ContractNameStep,
  PricingStep,
  ExpirationStep,
  ExchangeStep,
  DeployStep,
  GasStep
} from '../../../src/components/DeployContract/Steps';
import SimplifiedDeployment from '../../../src/components/DeployContract/SimplifiedDeployment';

describe('SimplifiedDeployment', () => {
  const exchangeStep = 0;
  const pricingStep = 1;
  const expirationStep = 2;
  const contractNameStep = 3;
  const gasStep = 4;
  const deployStep = 5;

  let simplifiedDeployment;
  let onDeployContractSpy;

  beforeEach(() => {
    onDeployContractSpy = sinon.spy();
    simplifiedDeployment = shallow(
      <SimplifiedDeployment onDeployContract={onDeployContractSpy} />
    );
  });

  it('should render 6 steps', () => {
    expect(simplifiedDeployment.find(Steps.Step)).to.have.length(6);
  });

  it('should render ExchangeStep default', () => {
    expect(simplifiedDeployment.find(ExchangeStep)).to.have.length(1);
  });

  it('should render ExchangeStep', () => {
    simplifiedDeployment.setState({ step: exchangeStep });
    expect(simplifiedDeployment.find(ExchangeStep)).to.have.length(1);
  });

  it('should reset the state', () => {
    const spy = sinon.spy(simplifiedDeployment.instance(), 'setState');
    simplifiedDeployment.setState({ step: exchangeStep });
    simplifiedDeployment.instance().resetState();
    expect(
      spy.calledWith({
        contractName: '',
        quoteAsset: '',
        collateralTokenAddress: '',
        priceFloor: '',
        priceCap: '',
        price: '',
        priceFloorSimplified: '',
        priceCapSimplified: '',
        priceDecimalPlaces: '',
        qtyMultiplier: '',
        expirationTimeStamp: '',
        oracleDataSource: '',
        oracleQuery: '',
        symbolName: ''
      })
    );
  });

  it('should move to prev step on PricingStep.onPrevClicked', () => {
    simplifiedDeployment.setState({ step: pricingStep });
    simplifiedDeployment.find(PricingStep).simulate('prevClicked');
    expect(simplifiedDeployment.state('step')).to.equal(pricingStep - 1);
  });

  it('should move to next step on PricingStep.onNextClicked', () => {
    simplifiedDeployment.setState({ step: pricingStep });
    simplifiedDeployment.find(PricingStep).simulate('nextClicked');
    expect(simplifiedDeployment.state('step')).to.equal(pricingStep + 1);
  });

  it('should render ExpirationStep', () => {
    simplifiedDeployment.setState({ step: expirationStep });
    expect(simplifiedDeployment.find(ExpirationStep)).to.have.length(1);
  });

  it('should render ContractNameStep', () => {
    simplifiedDeployment.setState({ step: contractNameStep });
    expect(simplifiedDeployment.find(ContractNameStep)).to.have.length(1);
  });

  it('should render GasStep', () => {
    simplifiedDeployment.setState({ step: gasStep });
    expect(simplifiedDeployment.find(GasStep)).to.have.length(1);
  });

  it('should reset to inital step', () => {
    simplifiedDeployment.setState({ step: deployStep });
    simplifiedDeployment.setProps({ error: 'Without data' });
    simplifiedDeployment.find(DeployStep).simulate('failSubmit');
    expect(simplifiedDeployment.state('step')).to.equal(0);
  });

  it('should called onDeployContract when DeployStep.deployContract', () => {
    simplifiedDeployment.setState({ step: deployStep });
    simplifiedDeployment
      .find(DeployStep)
      .props()
      .deployContract();
    expect(onDeployContractSpy).to.have.property('callCount', 1);
  });
});
