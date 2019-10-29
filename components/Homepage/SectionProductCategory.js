import React from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';

function Credit() {
  return(
    <div className="section section-category">
        <Paper elevation={0} className="category-base">
          <Link href="#">
            <div className="category-active">
              Tagihan
            </div>
          </Link>
          <Link href="#">
            <div>
              Travel
            </div>
          </Link>
          <Link href="#">
            <div>
              Entertainment
            </div>
          </Link>
          <Link href="#">
            <div>
              Dll
            </div>
          </Link>
        </Paper>
    </div>
  )
}

export default Credit