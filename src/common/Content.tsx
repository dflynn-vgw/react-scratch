import React from 'react';
import './Content.css';

/** Content container, with styles and layout */
export default function Content(props: { children: React.ReactNode }) {
  return <main classname="content">{props.children}</main>;
}
