<script>
    export let position;
</script>

<div id='frame'
    style='
        left: {position.x}px;
        top: {position.y}px;
    '
>HELPING</div>

<style>
    #frame {
        position: absolute;
        width: 200px;
        height: 200px;
        border: solid white 2px;

        pointer-events: none;
    }
</style>