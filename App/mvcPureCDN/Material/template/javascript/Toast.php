<div class="block  m30_0">
    <form name="checkToast" onsubmit="return false;">
        <h3>jQuery ToastMe Plugin Demo</h3>
        <div class="block  ">
        <label>Try your custom messages:</label>
     <textarea name="msg" class="form-mold" rows="3"></textarea>
 </div>

        <div class="block">
            <div>Modes:</div>
            <input type="radio" name="theme" value="info" checked/> <span>Info</span>
            <input type="radio" name="theme" value="success"/> <span>Success</span>
            <input type="radio" name="theme" value="warning"/> <span>Warning</span>
            <input type="radio" name="theme" value="error"/> <span>Error</span>
        </div>
        <input type="button" value="Show Toast" onclick="wowrol.U.showToast();" />

        </form>
    </div>

<div class="block m30_0">

<div id="myToast" class="toast-popup" style="width: auto; left: 31.7765%; display: block; top: 300px;">This is a toast notification!</div>

</div>