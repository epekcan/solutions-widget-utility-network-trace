import { React, Immutable, css, ThemeVariables, SerializedStyles, DataSourceManager, UseDataSource,
  defaultMessages as jimuCoreMessages, SessionManager, urlUtils } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder';
import { IMConfig } from '../config';
import defaultMessages from './translations/default';
import { Select, Checkbox, Table, Button, Icon, TextInput, Popper, Tooltip, Alert, Switch,
  defaultMessages as jimuUIDefaultMessages } from 'jimu-ui';
import { JimuMapViewSelector, SettingSection, SettingRow, SidePopper } from 'jimu-ui/advanced/setting-components';
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector';
const closeIcon = require('jimu-ui/lib/icons/close.svg');
const upArrowIcon = require('jimu-ui/lib/icons/direction-up.svg');
const downArrowIcon = require('jimu-ui/lib/icons/direction-down.svg');
const appSortIcon = require('jimu-ui/lib/icons/app-sort.svg');
const infoIcon = require('jimu-ui/lib/icons/info.svg');
const helpIcon = require('jimu-ui/lib/icons/help.svg');

interface State {
  allVersionList: Array<any>,
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>, State>{
  constructor(props) {
    super(props);
    this.state = {
      allVersionList: []
    }
  }
  //vms = new GDBVersionManager();
  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreMessages);
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values);
  }

  componentDidMount() {
  }

  render() {
    return <div className="widget-setting-demo">
      <SettingSection className="map-selector-section" title={'Choose a Map'}>
        <SettingRow>
          <JimuMapViewSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={this.props.config.useMapWidgetIds} />
        </SettingRow>
      </SettingSection>
    </div>
  }

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('useMapWidgetIds', useMapWidgetIds)
    });
  }


  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      .simple-view-header{
        background: ${theme.colors.secondary};
      }

    `
  }

}
