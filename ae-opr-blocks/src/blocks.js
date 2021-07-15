/**
 * Hero Cover block and internal children
 ***/
import './blocks/hero-cover/block.js';
import './blocks/hero-cover/components/startapply-banner.js';
import './blocks/jumplinks/block.js';

/***
* Content Section and Area blocks
* Content Section is automatically adde to Content Area container
***/
import './blocks/content-area/block.js';
import './blocks/content-section/block.js';


import './blocks/icon-list/block.js';
import './blocks/icon-list-child/block.js';

/// --> based on icon-list-child; allows background and border radius
import './blocks/icon-block/block.js';


import './blocks/testimonial/block.js';
import './blocks/video-testimonial/block.js';

import './blocks/visual-links/block.js';
import './blocks/visual-links-child/block.js';

import './blocks/list-columns/block.js';
import './blocks/list-column-child/block.js';

import './blocks/grid/block.js';
import './blocks/column/block.js';


import './blocks/layout-grid/block.js';
import './blocks/layout-grid/grid-column.js';

import './blocks/button/block.js';

import './blocks/course-accordion/block.js';
import './blocks/course/block.js';
import './blocks/dynamic-course-item/block.js';

import './blocks/opr-form/block.js';



/// --> pulled in from Advanced Gutenberg
import './blocks/advbutton/block.js';
import './blocks/advlist/block.js';

import './blocks/advcolumns/block.js';
import './blocks/advcolumns/column.js';

import './blocks/advaccordion/block.js';
import './blocks/advaccordion/accordion.js';

import './blocks/advtabs/tab.js';
import './blocks/advtabs/block.js';

import './blocks/advanced-heading/block.js';

/// --> Pulled from Atomic Blocks
import './blocks/video-grid/index.js';///may not be needed if it is being handled by Post Grid Block
import './blocks/block-post-grid/index.js';

/// --> variation on Post Grid block but only allows CPT Programs
import './blocks/programs-grid/index.js';


import './blocks/menu-section/block.js';



import AEOPR_Block_Icons from "Dist/blocks/controls/block-icons"

const { updateCategory } = wp.blocks

updateCategory( "aeopr", {
	//icon: AEOPR_Block_Icons.logo,
}, )