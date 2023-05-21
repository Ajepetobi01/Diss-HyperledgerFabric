/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Asset {
  @Property()
  public ID: string;

  @Property()
  public Username: string;

  @Property()
  public UserAccountIdentification: string;

  @Property()
  public AccountWalletBalance: number;

  @Property()
  public AccountLastTransaction: number;

  @Property()
  public AccountTotalTransaction: number;

  @Property()
  public AccountCurrency: string;

  @Property()
  public TotalTransaction: number;

  @Property()
  public AccountFirstName: string;

  @Property()
  public AccountLastName: string;

  @Property()
  public AccountLocation: string;
}
