import React, { useState } from 'react'
import './searchOverlay.scss'
import searchOverlayOpenContext from '../../context/searchOverlayStatusProvider'

const SearchOverlay = () => {
  const [openStatus, setOpenStatus] = useState(true)
  const toggleOpenStatus = () => {
    setOpenStatus(!openStatus)
  }
  return openStatus ? (
      <div id="search-overlay">
        <div class="search-container">
          <div class="search-header">
            <span class="search-close-button" onClick={toggleOpenStatus}>
              Close
              <span class="search-close-x"></span>
            </span>
          </div>
          <div class="search-body">
            <input
              type="input"
              class="search-field"
              placeholder="  Search"
              name="search-field"
              id="search-field"
              required
            />
            <span class="search-icon">
              Icon
            </span>
          </div>
          <div class="search-error">
            It looks like nothing was submitted<br />
            Please enter Your search term above.
          </div>
          <div class="search-footer">
            <div class="search-footer-headline">Consider browsing by category</div>
            <div class="search-footer-cols">
              <div class="search-footer-col">eins</div>
              <div class="search-footer-col">zwei</div>
            </div>
          </div>
        </div>
      </div>
  ) : null
}

export default SearchOverlay