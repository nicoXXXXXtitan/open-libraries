import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// import composant
import NavCategory from '../../src/components/HomeUser/PageHome/NavCategory';

describe('<NavCategory />', () => {

  it('Test the links of the navCategory ', () => {

    const listTypes = [
      {
        type: '',
      },
      {
        type: 'e',
      },
      {
        type: '',
      },
    ];

    const wrapper = shallow((<NavCategory listTypes={listTypes} />
    ));
    const texts = wrapper.find('.navItems').map((node) => node.text());
    expect(texts).to.eql(['Design', 'Informatique', 'Art']);
  });

});
