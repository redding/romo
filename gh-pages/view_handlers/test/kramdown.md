## Fenced Code Blocks

```ruby
# a comment

thing = 1
Some::Object.new(value, :some => 'opt')
Assert.stub(Object, :value){ 'new-val' }
Assert.stub(Object, :value) do |val|
  'new-val'
end
```

```css
.CodeRay {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 6px 10px;
  margin: 15px 0;
}

.some-class
```

`.some-class` with inline text


```html
<div class="this">
  <div class="is"
       data-1="a test">
    <span>Something goes here</span>
  </div>
</div>
```
