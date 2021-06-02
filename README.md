# ngx-file-select

Tired of forcing your users to access their own files on a web app by entering a path so that NodeJS can interact with it.  This is a simple web component which acts as a lightweight alternative to the Electron file browser. 

## Preview


## Example: Embed in a bootsrap modal
```html

    <script type="text/javascript">
        function handleBrowseEvent(event) {
            window.removeEventListener('fselect', handleBrowseEvent);
            $("#browseModal").modal('hide');
            $("#new-node-input-filename").val(event.detail.path);
        }
    </script>

    <!-- Bootstrap 4 modal -->
    <div id="browseModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
            <h3 id="myModalLabel" class="modal-title text-white">File Browse Control</h3>
            <button type="button" class="close text-white" id="modal-x" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>

            <div class="modal-body" id="fileBrowseControl">
            <div style="background-color: white;">
                <file-browse></file-browse>
            </div>
            </div>

            </div>
        </div>
        </div>
    </div>
```
