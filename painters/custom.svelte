<script>
export let attrs={};
export let text='';
export let tagname='';
$: tagname;
</script>
Hi!{attrs?.id||''} {text}