import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentSlider extends Schema.Component {
  collectionName: 'components_component_sliders';
  info: {
    displayName: 'slider';
  };
  attributes: {
    type: Attribute.String;
    label: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'component.slider': ComponentSlider;
    }
  }
}
