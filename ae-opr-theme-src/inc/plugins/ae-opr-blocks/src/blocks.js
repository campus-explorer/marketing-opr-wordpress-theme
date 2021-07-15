import './blocks/hero-cover/block.js';

import './blocks/content-area/block.js';
import './blocks/content-section/block.js';

import './blocks/icon-list/block.js';
import './blocks/testimonial/block.js';
import './blocks/visual-links/block.js';
import './blocks/list-columns/block.js';

import './blocks/column/block.js';
import './blocks/list-column-child/block.js';
import './blocks/visual-links-child/block.js';
import './blocks/icon-list-child/block.js';

import './blocks/button/block.js';
import './blocks/course/block.js';
import './blocks/dynamic-course-item/block.js';
import './blocks/icon-block/block.js';
import './blocks/video-testimonial/block.js';

import './blocks/course-accordion/block.js';
import './blocks/start-date-block/block.js';
import './blocks/jumplinks/block.js';

/// --> pulled in from Advanced Gutenberg
import './blocks/advlist/block.js';
import './blocks/advcolumns/block.js';
import './blocks/advcolumns/column.js';
import './blocks/advaccordion/block.js';
import './blocks/advaccordion/accordion.js';

/// --> PUlled from Atomic Blocks
import './blocks/video-grid/index.js';
import './blocks/block-post-grid/index.js';

import './blocks/menu-section/block.js';


import AEOPR_Block_Icons from "../dist/blocks/controls/block-icons"

const { updateCategory } = wp.blocks

updateCategory( "aeopr", {
	//icon: AEOPR_Block_Icons.logo,
}, )