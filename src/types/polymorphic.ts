/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/types/polymorphic.ts
import * as React from 'react';

/**
 * Helper type to extract the props of the component being rendered.
 */
export type AsProp<C extends React.ElementType> = {
  as?: C;
};

/**
 * Helper type to omit certain props from a component.
 */
export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Polymorphic component props. Combines the props of the component itself with the props of the element it's rendering as.
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = Props & AsProp<C> & Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Helper type to extract the ref type based on the element.
 */
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

/**
 * Polymorphic component type. Ensures that the component can change the rendered element type via the `as` prop.
 */
export type PolymorphicForwardRef<
  C extends React.ElementType,
  Props = {}
> = React.ForwardRefExoticComponent<
  PolymorphicComponentProps<C, Props> & React.RefAttributes<PolymorphicRef<C>>
>;