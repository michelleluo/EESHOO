<?php
require_once 'Mage/Checkout/controllers/CartController.php';
class Custom_Addcart_IndexController extends Mage_Core_Controller_Front_Action
{
    public function customAction()
    {
        $org_product=Mage::getModel('catalog/product')->load($_GET['id']);
        $product=Mage::getModel('catalog/product')->load(46);
//        $supplement=$_GET['supplement'];
//        if($supplement=='')
//        {
//            $supplement="N/A";
//        }
        $price=$org_product->getPrice();
        $sku=$org_product->getSku();
//        $description=$_GET['description'];
//        $additional_info=$_GET['additional_info'];
//        if($additional_info=='')
//        {
//            $additional_info="N/A";
//        }
        $qty=1;
//        $refrence_no=$_GET['refrence_no'];
//        $product_url=$_GET['product_url'];
//        $image_url=$_GET['image_url'];
        
        
            $cos=array();
            $co=array();
            $options = $product->getProductOptionsCollection();
            if (isset($options)) {
                foreach ($options as $o) {  
                    $title=$o->getTitle();
                    if ($title == "Book Name") {
                        $additional=0;
                        foreach($o->getValues() as $data)
                        {
                            if($sku == $data->getSku())
                            {
                                $additional=1;
                            }
                        }                        
                        if($additional !=1)
                        {
                            $value = Mage::getModel('catalog/product_option_value'); 
                            $value->setOption($o) 
                                ->setTitle('test') 
                                ->setSku($sku)
                                ->setPriceType("fixed")
                                ->setPrice($price)
                                ->setOptionId($o->getId());
                            $value->save();
                            $cos[]=$value->toArray($co);
                        }
                    }
                }
            }
            
            /*Getting Id's of Custom Options=========================================================*/
            $options = $product->getProductOptionsCollection();
            if (isset($options)) {
                foreach ($options as $o) {     
                    $title=$o->getTitle();
                    if ($title == "Book Name") {
                        $custom_additional_info_id=$o->getId();
                        foreach($o->getValues() as $data)
                        {
                            if($part_no == $data->getSku())
                            {
                                $additional_info_id=$data['option_type_id'];
                            }
                        } 
                    }
                }
            }
        $cart   = $this->_getCart();
        $params = $this->getRequest()->getParams();
        $params['options'] = array(
                $custom_additional_info_id   =>  $additional_info_id,
//                $custom_description_id       =>  $desc_id,
//                $custom_part_no_id           =>  $part_no_id,
//                $custom_supplement_id        =>  $supp_id,
//                $custom_refrence_no_id       =>  $refrence_no_id,
//                $custom_product_url_id       =>  $product_url_id,
//                $custom_image_url_id         =>  $image_url_id
            );
        try {
            if (isset($params['qty'])) {
                $filter = new Zend_Filter_LocalizedToNormalized(
                    array('locale' => Mage::app()->getLocale()->getLocaleCode())
                );
                $params['qty'] = '1';
            }
            $related = $this->getRequest()->getParam('related_product');

            /**
             * Check product availability
             */
            if (!$product) {
                $this->_goBack();
                return;
            }

            $cart->addProduct($product, $params);
            if (!empty($related)) {
                $cart->addProductsByIds(explode(',', $related));
            }

            $cart->save();

            $this->_getSession()->setCartWasUpdated(true);

            /**
             * @todo remove wishlist observer processAddToCart
             */
            Mage::dispatchEvent('checkout_cart_add_product_complete',
                array('product' => $product, 'request' => $this->getRequest(), 'response' => $this->getResponse())
            );

            if (!$this->_getSession()->getNoCartRedirect(true)) {
                if (!$cart->getQuote()->getHasError()) {
                    $message = $this->__('%s was added to your shopping cart.', Mage::helper('core')->escapeHtml($product->getName()));
                    $this->_getSession()->addSuccess($message);
                }
                $this->_redirect("checkout/cart");
            }
        } catch (Mage_Core_Exception $e) {
            if ($this->_getSession()->getUseNotice(true)) {
                $this->_getSession()->addNotice(Mage::helper('core')->escapeHtml($e->getMessage()));
            } else {
                $messages = array_unique(explode("\n", $e->getMessage()));
                foreach ($messages as $message) {
                    $this->_getSession()->addError(Mage::helper('core')->escapeHtml($message));
                }
            }

            $url = $this->_getSession()->getRedirectUrl(true);
            if ($url) {
                $this->getResponse()->setRedirect($url);
                $this->_redirect("checkout/cart");
            } else {
                $this->_redirectReferer();
            }
        } catch (Exception $e) {
            $this->_getSession()->addException($e, $this->__('Cannot add the item to shopping cart.'));
            Mage::logException($e);
            $this->_redirect("checkout/cart");
        }

}
}