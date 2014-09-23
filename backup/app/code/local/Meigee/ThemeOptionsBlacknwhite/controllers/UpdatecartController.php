<?php
/**
 * Magento
 *
 * @author    Meigeeteam http://www.meigeeteam.com <nick@meigeeteam.com>
 * @copyright Copyright (C) 2010 - 2014 Meigeeteam
 *
 */
class Meigee_ThemeOptionsBlacknwhite_UpdatecartController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
		$this->loadLayout();
		echo Mage::app()->getLayout()->createBlock('checkout/cart_sidebar')->setTemplate('checkout/cart/topcart.phtml')->toHtml();
    }
}