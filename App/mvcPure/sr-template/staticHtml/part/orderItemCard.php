<?php
    
$images='<div class="w2" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-variant-ligatures: normal; font-weight: normal; font-stretch: inherit; line-height: inherit; font-family: &quot;Helvetica Neue&quot;, Roboto, &quot;Segoe UI&quot;, Calibri, sans-serif; float: left; position: relative; min-height: 1px; width: 76.625px; color: rgb(41, 47, 51);">
	<div class="img-media " style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit;"><a href="{{{slug}}}" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; color: rgb(18, 116, 192); cursor: pointer;"><img class="img-responsive m0_auto" src="{{images}}" data-src="" alt="{{{pN}}}" style="box-sizing: border-box; margin: 0px auto; padding: 0px; border: 0px; vertical-align: middle; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; display: block; max-width: 100%; height: auto;"></a></div>
</div>';

//prventing images for in pdf document
if(isset($tab)){
   if($tab=="pdfOrderDetails"){
    $images='';
} 
}



$orderItemCard='<div class="block _bdy _B-gray bg_0 m_b10" style="box-sizing: border-box; margin: 0px 0px 10px; padding: 5px; border: 1px solid rgb(216, 216, 216); vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 12px; min-height: 1px; width: 100%; background-color: rgb(255, 255, 255) !important;">
	<div class="block  bg_0 " style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 460px;">
		<div class="block ul _bdy_5-0 ov-hi bg_0" data-role="cart-card" style="box-sizing: border-box; margin: 0px; padding: 5px 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 460px; overflow: hidden; position: relative; list-style: none;">
			<div class="block li m_b5" style="box-sizing: border-box; margin: 0px 0px 5px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 460px; position: relative;">
           

				<div class="w9" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-variant-ligatures: normal; font-stretch: inherit; line-height: inherit; font-family: &quot;Helvetica Neue&quot;, Roboto, &quot;Segoe UI&quot;, Calibri, sans-serif; float: left; position: relative; min-height: 1px; width: 345px; color: rgb(41, 47, 51); orphans: 2; widows: 2;">
					<span class=" fw-b m0" style="box-sizing: border-box; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; margin: 0px !important;">
						<div class="block w4 col4  " style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-variant-ligatures: normal; font-weight: normal; font-stretch: inherit; line-height: inherit; min-height: 1px; width: 460px; float: left; position: relative;">
							<div class="block _bdy fg_5 ff_3" style="box-sizing: border-box; margin: 0px; padding: 5px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: &quot;Helvetica Neue&quot;, Helvetica, Calibri, Arial, sans-serif; min-height: 1px; width: 460px; color: rgb(51, 51, 51) !important;">
								<h4 style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; line-height: 1;">
									'.$images.'
								</h4>
								<h3 class="fw-b truncate tt-c al-lc" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; line-height: 1; text-transform: capitalize; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><a class="wbk" href="{{{slug}}}" title="{{{pN}}}" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-size: 14.04px; color: rgb(18, 116, 192); cursor: pointer; text-decoration-line: none; text-decoration-style: initial; text-decoration-color: initial; word-break: keep-all;">{{{pN}}}</a></h3>
								<h4 style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; line-height: 1;">
									<div class="w9" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-variant-ligatures: normal; font-weight: normal; font-stretch: inherit; line-height: inherit; font-family: &quot;Helvetica Neue&quot;, Roboto, &quot;Segoe UI&quot;, Calibri, sans-serif; float: left; position: relative; min-height: 1px; width: 345px; color: rgb(41, 47, 51);">
										<div class="block m_b5 al-l " style="box-sizing: border-box; margin: 0px 0px 5px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 345px;">{{{pvNVl}}} </div>
										<div class="block m_b5 al-l " style="box-sizing: border-box; margin: 0px 0px 5px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 345px;"><span class="" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit;">Purchase Price :</span>&nbsp;<span class=" fw-b m0" style="box-sizing: border-box; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; margin: 0px !important;">{{currencySymbole}}  {{{sP}}}</span></div>
										<div class="block m_b5 al-l " style="box-sizing: border-box; margin: 0px 0px 5px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 345px;"><span class="" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit;">Ordered Quentity :</span>&nbsp;<span class=" fw-b m0" style="box-sizing: border-box; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; margin: 0px !important;">{{{q}}}</span></div>
										<div class="block m_b5 al-l " style="box-sizing: border-box; margin: 0px 0px 5px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; min-height: 1px; width: 345px;"><span class="" style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit;">SKU :</span>&nbsp;<span class=" fw-b m0" style="box-sizing: border-box; padding: 0px; border: 0px; vertical-align: baseline; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-family: inherit; margin: 0px !important;">{{{sku}}}</span></div>
									</div>
								</h4>
							</div>
						</div>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>';






?>