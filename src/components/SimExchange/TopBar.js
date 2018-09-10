import React, { Component } from 'react';
import { Col, Row, Select } from 'antd';
import _ from 'lodash';

import Loader from '../Loader';
import { formatedTimeFrom } from '../../util/utils';

import volume from '../../img/icons/24hr_volume.svg';
import contractIcon from '../../img/icons/contract.svg';

class TopBar extends Component {
  render() {
    const { contract, contracts } = this.props;
    let validContracts = _.filter(contracts, contract => {
      return contract.isSettled === false;
    });
    const Option = Select.Option;
    function handleChange(value, key) {
      console.log(`selected ${value}`);
      console.log(`selected ${key}`);

      this.props.onSelectContract(key);
    }

    return (
      <div style={{ width: '100%' }}>
        {contracts && (
          <Row type="flex" justify="space-between">
            <Col lg={8} xl={8} md={12} sm={16}>
              <img alt="contract" src={contractIcon} />
              <Select
                showSearch
                style={{ width: '50%', border: 'none' }}
                // placeholder={contract ? contract.CONTRACT_NAME : 'Contracts'}
                placeholder="Search contracts"
                optionFilterProp="children"
                onChange={handleChange}
                dropdownStyle={{ border: 'none' }}
              >
                {validContracts &&
                  validContracts.map(c => (
                    <Option value={c.key} contract={c} key={c}>
                      {c.CONTRACT_NAME}
                    </Option>
                  ))}
              </Select>
            </Col>
            <Col span={12} className="contract-meta-data">
              <p style={{ fontWeight: '500' }}>
                <img
                  alt="24hrVolume"
                  src={volume}
                  className="contract-data-icons"
                />
                <span
                  style={{
                    opacity: '0.7',
                    marginRight: '10px',
                    fontWeight: '300'
                  }}
                >
                  Expiration:
                </span>
                {contract ? formatedTimeFrom(contract.EXPIRATION) : 0}
              </p>
            </Col>
          </Row>
        )}
        {!contracts && (
          <Row type="flex" justify="center" align="middle">
            <Loader message="Loading Contracts, Please Wait..." />
          </Row>
        )}
      </div>
    );
  }
}

export default TopBar;
