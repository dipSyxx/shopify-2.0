import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from '../../pages/index.module.sass'

const Skeleton = (props: JSX.IntrinsicAttributes) => {
  return (
    <>
      <div className={styles.product_list}>
        <ContentLoader
          speed={2}
          width={300}
          height={480}
          viewBox="0 0 300 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="10" y="1" rx="15" ry="15" width="258" height="52" />
          <rect x="10" y="63" rx="10" ry="10" width="258" height="258" />
          <rect x="10" y="343" rx="15" ry="15" width="90" height="34" />
          <rect x="133" y="339" rx="15" ry="15" width="136" height="43" />
          <rect x="10" y="397" rx="15" ry="15" width="258" height="52" />
        </ContentLoader>
      </div>
    </>
  )
}

export default Skeleton
