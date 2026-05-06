import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

export default function Root({children}) {
  const {pathname, search, hash} = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({top: 0, left: 0});
    }
  }, [pathname, search, hash]);

  return children;
}
