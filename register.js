// register.js

import React from 'react';
import { STORY_CHANGED } from '@storybook/core-events';
import addons, { types } from '@storybook/addons';
import { populateComponentsApp, initializeFragments } from 'meteor/vulcan:lib';

const ADDON_ID = 'vulcan';
const PARAM_KEY = 'vulcan';
const PANEL_ID = `${ADDON_ID}/panel`;


class VulcanWrapper extends React.Component {
  componentWillMount() {
    this.initComponents();
  }
  initComponents = () => {
    // we need registered fragments to be initialized because populateComponentsApp will run
    // hocs, like withUpdate, that rely on fragments
    initializeFragments();
    // actually fills the Components object
    populateComponentsApp();
  };
  onStoryChange = id => {
    this.initComponents();
  };

  componentDidMount() {
    const { api } = this.props;
    api.on(STORY_CHANGED, this.onStoryChange);
  }

  componentWillUnmount() {
    const { api } = this.props;

    api.off(STORY_CHANGED, this.onStoryChange);
  }

  render() {
    return <div>Hello</div>
  }
}

addons.register(ADDON_ID, api => {
  const render = ({ active }) => <VulcanWrapper api={api} active={active} />;
  const title = 'Vulcan';

  addons.add(ADDON_ID, {
    //type: types.TOOL,
    tupe: types.PANEL,
    title,
    //match: ({ viewMode }) => viewMode === 'story',
    render,
  });
});
